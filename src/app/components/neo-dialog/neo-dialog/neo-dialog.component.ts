/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { Directionality } from '@angular/cdk/bidi';
import {
  Overlay,
  OverlayConfig,
  OverlayContainer,
  OverlayRef,
  ScrollStrategy,
} from '@angular/cdk/overlay';
import {
  ComponentPortal,
  ComponentType,
  TemplatePortal,
} from '@angular/cdk/portal';
import { Location } from '@angular/common';
import {
  Inject,
  Injectable,
  InjectionToken,
  Injector,
  OnDestroy,
  Optional,
  SkipSelf,
  TemplateRef,
  StaticProvider,
} from '@angular/core';
import { defer, Observable, of as observableOf, Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { NeoDialogConfig } from './neo-dialog-config';
import { NeoDialogContainer } from './neo-dialog-container';
import { NeoDialogRef } from './neo-dialog-ref';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

/** Injection token that can be used to access the data that was passed in to a dialog. */
export const NEO_DIALOG_DATA = new InjectionToken<any>('NeoDialogData');

/** Injection token that can be used to specify default dialog options. */
export const MAT_DIALOG_DEFAULT_OPTIONS = new InjectionToken<NeoDialogConfig>(
  'mat-dialog-default-options'
);

/** Injection token that determines the scroll handling while the dialog is open. */
export const MAT_DIALOG_SCROLL_STRATEGY = new InjectionToken<
  () => ScrollStrategy
>('mat-dialog-scroll-strategy');

/** @docs-private */
export function MAT_DIALOG_SCROLL_STRATEGY_FACTORY(
  overlay: Overlay
): () => ScrollStrategy {
  return () => overlay.scrollStrategies.block();
}

/** @docs-private */
export function MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY(
  overlay: Overlay
): () => ScrollStrategy {
  return () => overlay.scrollStrategies.block();
}

/** @docs-private */
export const MAT_DIALOG_SCROLL_STRATEGY_PROVIDER = {
  provide: MAT_DIALOG_SCROLL_STRATEGY,
  deps: [Overlay],
  useFactory: MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY,
};

/**
 * Service to open Material Design modal dialogs.
 */
@Injectable()
export class NeoDialog extends MatDialog implements OnDestroy {
  private _neoOpenDialogsAtThisLevel: NeoDialogRef<any>[] = [];
  private readonly _neoAfterAllClosedAtThisLevel = new Subject<void>();
  private readonly _neoAfterOpenedAtThisLevel = new Subject<
    NeoDialogRef<any>
  >();
  private _neoAriaHiddenElements = new Map<Element, string | null>();
  private _neoScrollStrategy: () => ScrollStrategy;

  /** Keeps track of the currently-open dialogs. */
  get openDialogs(): NeoDialogRef<any>[]  {
    return this._neoParentDialog
      ? this._neoParentDialog.openDialogs
      : this._neoOpenDialogsAtThisLevel;
  }

  /** Stream that emits when a dialog has been opened. */
  get afterOpened(): Subject<NeoDialogRef<any> | MatDialogRef<any>> {
    return this._neoParentDialog
      ? this._neoParentDialog.afterOpened
      : this._neoAfterOpenedAtThisLevel;
  }

  get _afterAllClosed(): Subject<void> {
    const parent = this._neoParentDialog;
    return parent ? parent._afterAllClosed : this._neoAfterAllClosedAtThisLevel;
  }

  // TODO (jelbourn): tighten the typing right-hand side of this expression.
  /**
   * Stream that emits when all open dialog have finished closing.
   * Will emit on subscribe if there are no open dialogs to begin with.
   */
  readonly afterAllClosed: Observable<void> = defer(() =>
    this.openDialogs.length
      ? this._afterAllClosed
      : this._afterAllClosed.pipe(startWith(undefined))
  ) as Observable<any>;

  constructor(
    private _neoOverlay: Overlay,
    private _neoInjector: Injector,
    /**
     * @deprecated `_neoLocation` parameter to be removed.
     * @breaking-change 10.0.0
     */
    @Optional() _neoLocation: Location,
    @Optional()
    @Inject(MAT_DIALOG_DEFAULT_OPTIONS)
    private _neoDefaultOptions: NeoDialogConfig,
    @Inject(MAT_DIALOG_SCROLL_STRATEGY) scrollStrategy: any,
    @Optional() @SkipSelf() private _neoParentDialog: NeoDialog,
    private _neoOverlayContainer: OverlayContainer
  ) {
    super(
      _neoOverlay,
      _neoInjector,
      _neoLocation,
      _neoDefaultOptions,
      scrollStrategy,
      _neoParentDialog as MatDialog,
      _neoOverlayContainer
    );
    this._neoScrollStrategy = scrollStrategy;
  }

  /**
   * Opens a modal dialog containing the given component.
   * @param componentOrTemplateRef Type of the component to load into the dialog,
   *     or a TemplateRef to instantiate as the dialog content.
   * @param config Extra configuration options.
   * @returns Reference to the newly-opened dialog.
   */
  open<T, D = any, R = any>(
    componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
    config?: NeoDialogConfig<D>
  ): NeoDialogRef<T, R> {
    config = _applyConfigDefaults(
      config,
      this._neoDefaultOptions || new NeoDialogConfig()
    );

    if (config.id && this.getDialogById(config.id)) {
      throw Error(
        `Dialog with id "${config.id}" exists already. The dialog id must be unique.`
      );
    }

    const overlayRef = this._neoCreateOverlay(config);
    const dialogContainer = this._neoAttachDialogContainer(overlayRef, config);
    const dialogRef = this._neoAttachDialogContent<T, R>(
      componentOrTemplateRef,
      dialogContainer,
      overlayRef,
      config
    );

    // If this is the first dialog that we're opening, hide all the non-overlay content.
    if (!this.openDialogs.length) {
      this._neoHideNonDialogContentFromAssistiveTechnology();
    }

    this.openDialogs.push(dialogRef);
    dialogRef
      .afterClosed()
      .subscribe(() => this._neoRemoveOpenDialog(dialogRef));
    this.afterOpened.next(dialogRef);

    return dialogRef;
  }

  /**
   * Closes all of the currently-open dialogs.
   */
  closeAll(): void {
    this._neoCloseDialogs(this.openDialogs);
  }

  /**
   * Finds an open dialog by its id.
   * @param id ID to use when looking up the dialog.
   */
  getDialogById(id: string): NeoDialogRef<any> | MatDialogRef<any> | undefined {
    return this.openDialogs.find((dialog) => dialog.id === id);
  }

  ngOnDestroy() {
    // Only close the dialogs at this level on destroy
    // since the parent service may still be active.
    this._neoCloseDialogs(this._neoOpenDialogsAtThisLevel);
    this._neoAfterAllClosedAtThisLevel.complete();
    this._neoAfterOpenedAtThisLevel.complete();
  }

  /**
   * Creates the overlay into which the dialog will be loaded.
   * @param config The dialog configuration.
   * @returns A promise resolving to the OverlayRef for the created overlay.
   */
  private _neoCreateOverlay(config: NeoDialogConfig): OverlayRef {
    const overlayConfig = this._neoGetOverlayConfig(config);
    return this._neoOverlay.create(overlayConfig);
  }

  /**
   * Creates an overlay config from a dialog config.
   * @param dialogConfig The dialog configuration.
   * @returns The overlay configuration.
   */
  private _neoGetOverlayConfig(dialogConfig: NeoDialogConfig): OverlayConfig {
    const state = new OverlayConfig({
      positionStrategy: this._neoOverlay.position().global(),
      scrollStrategy: dialogConfig.scrollStrategy || this._neoScrollStrategy(),
      panelClass: dialogConfig.panelClass,
      hasBackdrop: dialogConfig.hasBackdrop,
      direction: dialogConfig.direction,
      minWidth: dialogConfig.minWidth,
      minHeight: dialogConfig.minHeight,
      maxWidth: dialogConfig.maxWidth,
      maxHeight: dialogConfig.maxHeight,
      disposeOnNavigation: dialogConfig.closeOnNavigation,
    });

    if (dialogConfig.backdropClass) {
      state.backdropClass = dialogConfig.backdropClass;
    }

    return state;
  }

  /**
   * Attaches an NeoDialogContainer to a dialog's already-created overlay.
   * @param overlay Reference to the dialog's underlying overlay.
   * @param config The dialog configuration.
   * @returns A promise resolving to a ComponentRef for the attached container.
   */
  private _neoAttachDialogContainer(
    overlay: OverlayRef,
    config: NeoDialogConfig
  ): NeoDialogContainer {
    const userInjector =
      config && config.viewContainerRef && config.viewContainerRef.injector;
    const injector = Injector.create({
      parent: userInjector || this._neoInjector,
      providers: [{ provide: NeoDialogConfig, useValue: config }],
    });

    const containerPortal = new ComponentPortal(
      NeoDialogContainer,
      config.viewContainerRef,
      injector,
      config.componentFactoryResolver
    );
    const containerRef = overlay.attach<NeoDialogContainer>(containerPortal);

    return containerRef.instance;
  }

  /**
   * Attaches the user-provided component to the already-created NeoDialogContainer.
   * @param componentOrTemplateRef The type of component being loaded into the dialog,
   *     or a TemplateRef to instantiate as the content.
   * @param dialogContainer Reference to the wrapping NeoDialogContainer.
   * @param overlayRef Reference to the overlay in which the dialog resides.
   * @param config The dialog configuration.
   * @returns A promise resolving to the NeoDialogRef that should be returned to the user.
   */
  private _neoAttachDialogContent<T, R>(
    componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
    dialogContainer: NeoDialogContainer,
    overlayRef: OverlayRef,
    config: NeoDialogConfig
  ): NeoDialogRef<T, R> {
    // Create a reference to the dialog we're creating in order to give the user a handle
    // to modify and close it.
    const dialogRef = new NeoDialogRef<T, R>(
      overlayRef,
      dialogContainer,
      config.id
    );

    if (componentOrTemplateRef instanceof TemplateRef) {
      dialogContainer.attachTemplatePortal(
        new TemplatePortal<T>(componentOrTemplateRef, null!, <any>{
          $implicit: config.data,
          dialogRef,
        })
      );
    } else {
      const injector = this._neoCreateInjector<T>(
        config,
        dialogRef,
        dialogContainer
      );
      const contentRef = dialogContainer.attachComponentPortal<T>(
        new ComponentPortal(
          componentOrTemplateRef,
          config.viewContainerRef,
          injector
        )
      );
      dialogRef.componentInstance = contentRef.instance;
    }

    dialogRef
      .updateSize(config.width, config.height)
      .updatePosition(config.position);

    return dialogRef;
  }

  /**
   * Creates a custom injector to be used inside the dialog. This allows a component loaded inside
   * of a dialog to close itself and, optionally, to return a value.
   * @param config Config object that is used to construct the dialog.
   * @param dialogRef Reference to the dialog.
   * @param container Dialog container element that wraps all of the contents.
   * @returns The custom injector that can be used inside the dialog.
   */
  private _neoCreateInjector<T>(
    config: NeoDialogConfig,
    dialogRef: NeoDialogRef<T>,
    dialogContainer: NeoDialogContainer
  ): Injector {
    const userInjector =
      config && config.viewContainerRef && config.viewContainerRef.injector;

    // The NeoDialogContainer is injected in the portal as the NeoDialogContainer and the dialog's
    // content are created out of the same ViewContainerRef and as such, are siblings for injector
    // purposes. To allow the hierarchy that is expected, the NeoDialogContainer is explicitly
    // added to the injection tokens.
    const providers: StaticProvider[] = [
      { provide: NeoDialogContainer, useValue: dialogContainer },
      { provide: NEO_DIALOG_DATA, useValue: config.data },
      { provide: NeoDialogRef, useValue: dialogRef },
    ];

    if (
      config.direction &&
      (!userInjector ||
        !userInjector.get<Directionality | null>(Directionality, null))
    ) {
      providers.push({
        provide: Directionality,
        useValue: { value: config.direction, change: observableOf() },
      });
    }

    return Injector.create({
      parent: userInjector || this._neoInjector,
      providers,
    });
  }

  /**
   * Removes a dialog from the array of open dialogs.
   * @param dialogRef Dialog to be removed.
   */
  private _neoRemoveOpenDialog(dialogRef: NeoDialogRef<any>) {
    const index = this.openDialogs.indexOf(dialogRef);

    if (index > -1) {
      this.openDialogs.splice(index, 1);

      // If all the dialogs were closed, remove/restore the `aria-hidden`
      // to a the siblings and emit to the `afterAllClosed` stream.
      if (!this.openDialogs.length) {
        this._neoAriaHiddenElements.forEach((previousValue, element) => {
          if (previousValue) {
            element.setAttribute('aria-hidden', previousValue);
          } else {
            element.removeAttribute('aria-hidden');
          }
        });

        this._neoAriaHiddenElements.clear();
        this._afterAllClosed.next();
      }
    }
  }

  /**
   * Hides all of the content that isn't an overlay from assistive technology.
   */
  private _neoHideNonDialogContentFromAssistiveTechnology() {
    const overlayContainer = this._neoOverlayContainer.getContainerElement();

    // Ensure that the overlay container is attached to the DOM.
    if (overlayContainer.parentElement) {
      const siblings = overlayContainer.parentElement.children;

      for (let i = siblings.length - 1; i > -1; i--) {
        let sibling = siblings[i];

        if (
          sibling !== overlayContainer &&
          sibling.nodeName !== 'SCRIPT' &&
          sibling.nodeName !== 'STYLE' &&
          !sibling.hasAttribute('aria-live')
        ) {
          this._neoAriaHiddenElements.set(
            sibling,
            sibling.getAttribute('aria-hidden')
          );
          sibling.setAttribute('aria-hidden', 'true');
        }
      }
    }
  }

  /** Closes all of the dialogs in an array. */
  private _neoCloseDialogs(dialogs: NeoDialogRef<any>[] | MatDialogRef<any>[]) {
    let i = dialogs.length;

    while (i--) {
      // The `_openDialogs` property isn't updated after close until the rxjs subscription
      // runs on the next microtask, in addition to modifying the array as we're going
      // through it. We loop through all of them and call close without assuming that
      // they'll be removed from the list instantaneously.
      dialogs[i].close();
    }
  }
}

/**
 * Applies default options to the dialog config.
 * @param config Config to be modified.
 * @param defaultOptions Default options provided.
 * @returns The new configuration object.
 */
function _applyConfigDefaults(
  config?: NeoDialogConfig,
  defaultOptions?: NeoDialogConfig
): NeoDialogConfig {
  return { ...defaultOptions, ...config };
}
