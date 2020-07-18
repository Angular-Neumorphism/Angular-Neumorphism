/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { LiveAnnouncer } from '@angular/cdk/a11y';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import {
  ComponentPortal,
  ComponentType,
  PortalInjector,
  TemplatePortal,
} from '@angular/cdk/portal';
import {
  ComponentRef,
  EmbeddedViewRef,
  Inject,
  Injectable,
  InjectionToken,
  Injector,
  Optional,
  SkipSelf,
  TemplateRef,
  OnDestroy,
  Type,
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { TextOnlySnackBar, NeoSimpleSnackBar } from './simple-neo-snack-bar';
import { NEO_SNACK_BAR_DATA, NeoSnackBarConfig } from './neo-snack-bar-config';
import {
  NeoSnackBarContainer,
  _NeoSnackBarContainer,
} from './neo-snack-bar-container';
import { NeoSnackBarModule } from '../neo-snack-bar.module';
import { NeoSnackBarRef } from './neo-snack-bar-ref';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

/** Injection token that can be used to specify default snack bar. */
export const NEO_SNACK_BAR_DEFAULT_OPTIONS = new InjectionToken<
  NeoSnackBarConfig
>('mat-snack-bar-default-options', {
  providedIn: 'root',
  factory: NEO_SNACK_BAR_DEFAULT_OPTIONS_FACTORY,
});

/** @docs-private */
export function NEO_SNACK_BAR_DEFAULT_OPTIONS_FACTORY(): NeoSnackBarConfig {
  return new NeoSnackBarConfig();
}

/**
 * Service to dispatch Material Design snack bar messages.
 */
@Injectable({ providedIn: NeoSnackBarModule })
export class NeoSnackBar implements OnDestroy {
  /**
   * Reference to the current snack bar in the view *at this level* (in the Angular injector tree).
   * If there is a parent snack-bar service, all operations should delegate to that parent
   * via `_openedSnackBarRef`.
   */
  private _snackBarRefAtThisLevel:
    | NeoSnackBarRef<any>
    | MatSnackBarRef<any>
    | null = null;

  /** The component that should be rendered as the snack bar's simple component. */
  protected simpleSnackBarComponent: Type<TextOnlySnackBar> = NeoSimpleSnackBar;

  /** The container component that attaches the provided template or component. */
  protected snackBarContainerComponent: Type<
    _NeoSnackBarContainer
  > = NeoSnackBarContainer;

  /** The CSS class to applie for handset mode. */
  protected handsetCssClass = 'mat-snack-bar-handset';

  /** Reference to the currently opened snackbar at *any* level. */
  get _openedSnackBarRef(): NeoSnackBarRef<any> | MatSnackBarRef<any> | null {
    const parent = this._parentSnackBar;
    return parent ? parent._openedSnackBarRef : this._snackBarRefAtThisLevel;
  }

  set _openedSnackBarRef(
    value: NeoSnackBarRef<any> | MatSnackBarRef<any> | null
  ) {
    if (this._parentSnackBar) {
      this._parentSnackBar._openedSnackBarRef = value;
    } else {
      this._snackBarRefAtThisLevel = value;
    }
  }

  constructor(
    private _overlay: Overlay,
    private _live: LiveAnnouncer,
    private _injector: Injector,
    private _breakpointObserver: BreakpointObserver,
    @Optional() @SkipSelf() private _parentSnackBar: MatSnackBar,
    @Inject(NEO_SNACK_BAR_DEFAULT_OPTIONS)
    private _defaultConfig: NeoSnackBarConfig
  ) {}

  /**
   * Creates and dispatches a snack bar with a custom component for the content, removing any
   * currently opened snack bars.
   *
   * @param component Component to be instantiated.
   * @param config Extra configuration for the snack bar.
   */
  openFromComponent<T>(
    component: ComponentType<T>,
    config?: NeoSnackBarConfig
  ): NeoSnackBarRef<T> {
    return this._attach(component, config) as NeoSnackBarRef<T>;
  }

  /**
   * Creates and dispatches a snack bar with a custom template for the content, removing any
   * currently opened snack bars.
   *
   * @param template Template to be instantiated.
   * @param config Extra configuration for the snack bar.
   */
  openFromTemplate(
    template: TemplateRef<any>,
    config?: NeoSnackBarConfig
  ): NeoSnackBarRef<EmbeddedViewRef<any>> | MatSnackBarRef<any> {
    return this._attach(template, config);
  }

  /**
   * Opens a snackbar with a message and an optional action.
   * @param message The message to show in the snackbar.
   * @param action The label for the snackbar action.
   * @param config Additional configuration options for the snackbar.
   */
  open(
    message: string,
    action: string = '',
    config?: NeoSnackBarConfig
  ): NeoSnackBarRef<TextOnlySnackBar> {
    const _config = { ...this._defaultConfig, ...config };

    // Since the user doesn't have access to the component, we can
    // override the data to pass in our own message and action.
    _config.data = { message, action };

    // Since the snack bar has `role="alert"`, we don't
    // want to announce the same message twice.
    if (_config.announcementMessage === message) {
      _config.announcementMessage = undefined;
    }

    return this.openFromComponent(this.simpleSnackBarComponent, _config);
  }

  /**
   * Dismisses the currently-visible snack bar.
   */
  dismiss(): void {
    if (this._openedSnackBarRef) {
      this._openedSnackBarRef.dismiss();
    }
  }

  ngOnDestroy() {
    // Only dismiss the snack bar at the current level on destroy.
    if (this._snackBarRefAtThisLevel) {
      this._snackBarRefAtThisLevel.dismiss();
    }
  }

  /**
   * Attaches the snack bar container component to the overlay.
   */
  private _attachSnackBarContainer(
    overlayRef: OverlayRef,
    config: NeoSnackBarConfig
  ): _NeoSnackBarContainer {
    const userInjector =
      config && config.viewContainerRef && config.viewContainerRef.injector;
    const injector = new PortalInjector(
      userInjector || this._injector,
      new WeakMap([[NeoSnackBarConfig, config]])
    );

    const containerPortal = new ComponentPortal(
      this.snackBarContainerComponent,
      config.viewContainerRef,
      injector
    );
    const containerRef: ComponentRef<_NeoSnackBarContainer> = overlayRef.attach(
      containerPortal
    );
    containerRef.instance.snackBarConfig = config;
    return containerRef.instance;
  }

  /**
   * Places a new component or a template as the content of the snack bar container.
   */
  private _attach<T>(
    content: ComponentType<T> | TemplateRef<T>,
    userConfig?: NeoSnackBarConfig
  ): NeoSnackBarRef<T | EmbeddedViewRef<any>> | MatSnackBarRef<any> {
    const config = {
      ...new NeoSnackBarConfig(),
      ...this._defaultConfig,
      ...userConfig,
    };
    const overlayRef = this._createOverlay(config);
    const container = this._attachSnackBarContainer(overlayRef, config);
    const snackBarRef = new NeoSnackBarRef<T | EmbeddedViewRef<any>>(
      container,
      overlayRef
    );

    if (content instanceof TemplateRef) {
      const portal = new TemplatePortal(content, null!, {
        $implicit: config.data,
        snackBarRef,
      } as any);

      snackBarRef.instance = container.attachTemplatePortal(portal);
    } else {
      const injector = this._createInjector(config, snackBarRef);
      const portal = new ComponentPortal(content, undefined, injector);
      const contentRef = container.attachComponentPortal<T>(portal);

      // We can't pass this via the injector, because the injector is created earlier.
      snackBarRef.instance = contentRef.instance;
    }

    // Subscribe to the breakpoint observer and attach the mat-snack-bar-handset class as
    // appropriate. This class is applied to the overlay element because the overlay must expand to
    // fill the width of the screen for full width snackbars.
    this._breakpointObserver
      .observe(Breakpoints.HandsetPortrait)
      .pipe(takeUntil(overlayRef.detachments()))
      .subscribe((state) => {
        const classList = overlayRef.overlayElement.classList;
        state.matches
          ? classList.add(this.handsetCssClass)
          : classList.remove(this.handsetCssClass);
      });

    this._animateSnackBar(snackBarRef, config);
    this._openedSnackBarRef = snackBarRef;
    return this._openedSnackBarRef;
  }

  /** Animates the old snack bar out and the new one in. */
  private _animateSnackBar(
    snackBarRef: NeoSnackBarRef<any>,
    config: NeoSnackBarConfig
  ) {
    // When the snackbar is dismissed, clear the reference to it.
    snackBarRef.afterDismissed().subscribe(() => {
      // Clear the snackbar ref if it hasn't already been replaced by a newer snackbar.
      if (this._openedSnackBarRef == snackBarRef) {
        this._openedSnackBarRef = null;
      }

      if (config.announcementMessage) {
        this._live.clear();
      }
    });

    if (this._openedSnackBarRef) {
      // If a snack bar is already in view, dismiss it and enter the
      // new snack bar after exit animation is complete.
      this._openedSnackBarRef.afterDismissed().subscribe(() => {
        snackBarRef.containerInstance.enter();
      });
      this._openedSnackBarRef.dismiss();
    } else {
      // If no snack bar is in view, enter the new snack bar.
      snackBarRef.containerInstance.enter();
    }

    // If a dismiss timeout is provided, set up dismiss based on after the snackbar is opened.
    if (config.duration && config.duration > 0) {
      snackBarRef
        .afterOpened()
        .subscribe(() => snackBarRef._dismissAfter(config.duration!));
    }

    if (config.announcementMessage) {
      this._live.announce(config.announcementMessage, config.politeness);
    }
  }

  /**
   * Creates a new overlay and places it in the correct location.
   * @param config The user-specified snack bar config.
   */
  private _createOverlay(config: NeoSnackBarConfig): OverlayRef {
    const overlayConfig = new OverlayConfig();
    overlayConfig.direction = config.direction;

    let positionStrategy = this._overlay.position().global();
    // Set horizontal position.
    const isRtl = config.direction === 'rtl';
    const isLeft =
      config.horizontalPosition === 'left' ||
      (config.horizontalPosition === 'start' && !isRtl) ||
      (config.horizontalPosition === 'end' && isRtl);
    const isRight = !isLeft && config.horizontalPosition !== 'center';
    if (isLeft) {
      positionStrategy.left('0');
    } else if (isRight) {
      positionStrategy.right('0');
    } else {
      positionStrategy.centerHorizontally();
    }
    // Set horizontal position.
    if (config.verticalPosition === 'top') {
      positionStrategy.top('0');
    } else {
      positionStrategy.bottom('0');
    }

    overlayConfig.positionStrategy = positionStrategy;
    return this._overlay.create(overlayConfig);
  }

  /**
   * Creates an injector to be used inside of a snack bar component.
   * @param config Config that was used to create the snack bar.
   * @param snackBarRef Reference to the snack bar.
   */
  private _createInjector<T>(
    config: NeoSnackBarConfig,
    snackBarRef: NeoSnackBarRef<T>
  ): PortalInjector {
    const userInjector =
      config && config.viewContainerRef && config.viewContainerRef.injector;

    return new PortalInjector(
      userInjector || this._injector,
      new WeakMap<any, any>([
        [NeoSnackBarRef, snackBarRef],
        [NEO_SNACK_BAR_DATA, config.data],
      ])
    );
  }
}
