/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
  Component,
  ChangeDetectorRef,
  Input,
  Inject,
  Output,
  EventEmitter,
  OnDestroy,
  OnInit,
  ElementRef,
  Directive,
  Optional,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ComponentFactoryResolver,
  ViewContainerRef,
  forwardRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import {
  TemplatePortal,
  CdkPortalOutlet,
  PortalHostDirective,
} from '@angular/cdk/portal';
import { Directionality, Direction } from '@angular/cdk/bidi';
import { DOCUMENT } from '@angular/common';
import { Subscription, Subject } from 'rxjs';
import { neoTabsAnimations } from './neo-tabs-animation';
import { startWith, distinctUntilChanged } from 'rxjs/operators';

import * as MatTabsModule from '@angular/material/tabs';

/**
 * These position states are used internally as animation states for the tab body. Setting the
 * position state to left, right, or center will transition the tab body from its current
 * position to its respective state. If there is not current position (void, in the case of a new
 * tab body), then there will be no transition animation to its state.
 *
 * In the case of a new tab body that should immediately be centered with an animating transition,
 * then left-origin-center or right-origin-center can be used, which will use left or right as its
 * psuedo-prior state.
 */
export type NeoTabBodyPositionState =
  | 'left'
  | 'center'
  | 'right'
  | 'left-origin-center'
  | 'right-origin-center';

/**
 * The origin state is an internally used state that is set on a new tab body indicating if it
 * began to the left or right of the prior selected index. For example, if the selected index was
 * set to 1, and a new tab is created and selected at index 2, then the tab body would have an
 * origin of right because its index was greater than the prior selected index.
 */
export type NeoTabBodyOriginState = 'left' | 'right';

/**
 * The portal host directive for the contents of the tab.
 * @docs-private
 */
@Directive({
  selector: '[neoTabBodyHost]',
})
export class NeoTabBodyPortal extends CdkPortalOutlet
  implements OnInit, OnDestroy {
  /** Subscription to events for when the tab body begins centering. */
  private _centeringSub = Subscription.EMPTY;
  /** Subscription to events for when the tab body finishes leaving from center position. */
  private _leavingSub = Subscription.EMPTY;

  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    viewContainerRef: ViewContainerRef,
    @Inject(forwardRef(() => NeoTabBody)) private _host: NeoTabBody,
    /**
     * @deprecated `_document` parameter to be made required.
     * @breaking-change 9.0.0
     */
    @Inject(DOCUMENT) _document?: any
  ) {
    super(componentFactoryResolver, viewContainerRef, _document);
  }

  /** Set initial visibility or set up subscription for changing visibility. */
  ngOnInit(): void {
    super.ngOnInit();
    this._centeringSub = this._host._beforeCentering
      .pipe(startWith(this._host._isCenterPosition(this._host._position)))
      .subscribe((isCentering: boolean) => {
        if (isCentering && !this.hasAttached()) {
          this.attach(this._host._content);
        }
      });

    this._leavingSub = this._host._afterLeavingCenter.subscribe(() => {
      this.detach();
    });
  }

  /** Clean up centering subscription. */
  ngOnDestroy(): void {
    super.ngOnDestroy();
    this._centeringSub.unsubscribe();
    this._leavingSub.unsubscribe();
  }
}

/**
 * Base class with all of the `NeoTabBody` functionality.
 * @docs-private
 */
@Directive()
// tslint:disable-next-line:class-name
export abstract class _NeoTabBodyBase implements OnInit, OnDestroy {
  /** Current position of the tab-body in the tab-group. Zero means that the tab is visible. */
  private _positionIndex: number;

  /** Subscription to the directionality change observable. */
  private _dirChangeSubscription = Subscription.EMPTY;

  /** Tab body position state. Used by the animation trigger for the current state. */
  _position: NeoTabBodyPositionState;

  /** Emits when an animation on the tab is complete. */
  _translateTabComplete = new Subject<AnimationEvent>();

  /** Event emitted when the tab begins to animate towards the center as the active tab. */
  @Output() readonly _onCentering: EventEmitter<number> = new EventEmitter<
    number
  >();

  /** Event emitted before the centering of the tab begins. */
  @Output() readonly _beforeCentering: EventEmitter<boolean> = new EventEmitter<
    boolean
  >();

  /** Event emitted before the centering of the tab begins. */
  @Output() readonly _afterLeavingCenter: EventEmitter<void> = new EventEmitter<
    void
  >();

  /** Event emitted when the tab completes its animation towards the center. */
  @Output() readonly _onCentered: EventEmitter<void> = new EventEmitter<void>(
    true
  );

  /** The portal host inside of this container into which the tab body content will be loaded. */
  abstract _portalHost: PortalHostDirective;

  /** The tab body content to display. */
  @Input('content') _content: TemplatePortal;

  /** Position that will be used when the tab is immediately becoming visible after creation. */
  @Input() origin: number | null;

  // Note that the default value will always be overwritten by `NeoTabBody`, but we need one
  // anyway to prevent the animations module from throwing an error if the body is used on its own.
  /** Duration for the tab's animation. */
  @Input() animationDuration: string = '500ms';

  /** The shifted index position of the tab body, where zero represents the active center tab. */
  @Input()
  set position(position: number) {
    this._positionIndex = position;
    this._computePositionAnimationState();
  }

  constructor(
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() private _dir: Directionality,
    changeDetectorRef: ChangeDetectorRef
  ) {
    if (_dir) {
      this._dirChangeSubscription = _dir.change.subscribe((dir: Direction) => {
        this._computePositionAnimationState(dir);
        changeDetectorRef.markForCheck();
      });
    }

    // Ensure that we get unique animation events, because the `.done` callback can get
    // invoked twice in some browsers. See https://github.com/angular/angular/issues/24084.
    this._translateTabComplete
      .pipe(
        distinctUntilChanged((x, y) => {
          return x.fromState === y.fromState && x.toState === y.toState;
        })
      )
      .subscribe((event) => {
        // If the transition to the center is complete, emit an event.
        if (
          this._isCenterPosition(event.toState) &&
          this._isCenterPosition(this._position)
        ) {
          this._onCentered.emit();
        }

        if (
          this._isCenterPosition(event.fromState) &&
          !this._isCenterPosition(this._position)
        ) {
          this._afterLeavingCenter.emit();
        }
      });
  }

  /**
   * After initialized, check if the content is centered and has an origin. If so, set the
   * special position states that transition the tab from the left or right before centering.
   */
  ngOnInit() {
    if (this._position == 'center' && this.origin != null) {
      this._position = this._computePositionFromOrigin(this.origin);
    }
  }

  ngOnDestroy() {
    this._dirChangeSubscription.unsubscribe();
    this._translateTabComplete.complete();
  }

  _onTranslateTabStarted(event: AnimationEvent): void {
    const isCentering = this._isCenterPosition(event.toState);
    this._beforeCentering.emit(isCentering);
    if (isCentering) {
      this._onCentering.emit(this._elementRef.nativeElement.clientHeight);
    }
  }

  /** The text direction of the containing app. */
  _getLayoutDirection(): Direction {
    return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
  }

  /** Whether the provided position state is considered center, regardless of origin. */
  _isCenterPosition(position: NeoTabBodyPositionState | string): boolean {
    return (
      position == 'center' ||
      position == 'left-origin-center' ||
      position == 'right-origin-center'
    );
  }

  /** Computes the position state that will be used for the tab-body animation trigger. */
  private _computePositionAnimationState(
    dir: Direction = this._getLayoutDirection()
  ) {
    if (this._positionIndex < 0) {
      this._position = dir == 'ltr' ? 'left' : 'right';
    } else if (this._positionIndex > 0) {
      this._position = dir == 'ltr' ? 'right' : 'left';
    } else {
      this._position = 'center';
    }
  }

  /**
   * Computes the position state based on the specified origin position. This is used if the
   * tab is becoming visible immediately after creation.
   */
  private _computePositionFromOrigin(origin: number): NeoTabBodyPositionState {
    const dir = this._getLayoutDirection();

    if ((dir == 'ltr' && origin <= 0) || (dir == 'rtl' && origin > 0)) {
      return 'left-origin-center';
    }

    return 'right-origin-center';
  }
}

/**
 * Wrapper for the contents of a tab.
 * @docs-private
 */
@Component({
  selector: 'neo-tab-body',
  templateUrl: 'neo-tab-body.html',
  styleUrls: ['neo-tab-boby.scss'],
  encapsulation: ViewEncapsulation.None,
  // tslint:disable-next-line:validate-decorators
  changeDetection: ChangeDetectionStrategy.Default,
  animations: [neoTabsAnimations.translateTab],
  host: {
    class: 'neo-tab-body',
  },
})
export class NeoTabBody extends _NeoTabBodyBase  {
  @ViewChild(PortalHostDirective) _portalHost: PortalHostDirective;

  constructor(
    elementRef: ElementRef<HTMLElement>,
    @Optional() dir: Directionality,
    changeDetectorRef: ChangeDetectorRef
  ) {
    super(elementRef, dir, changeDetectorRef);
  }
}
