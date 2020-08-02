import {
  Directive,
  Input,
  ElementRef,
  OnInit,
  NgZone,
  Optional,
  Inject,
  InjectionToken,
} from '@angular/core';
import { NeoRippleRenderer } from './neo-ripple-renderer';
import { Platform } from '@angular/cdk/platform';
import {
  RippleConfig,
  RippleGlobalOptions,
  MAT_RIPPLE_GLOBAL_OPTIONS,
  RippleAnimationConfig,
  RippleRenderer,
} from '@angular/material/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';

export const RIPPLE_TYPE = new InjectionToken('RippleType');
export enum RIPPLE_TYPES {
  NEO = 'NEO',
  MATERIAL = 'MATERIAL',
}

interface CommonRippleRenderer {
  setupTriggerEvents(
    elementOrElementRef: HTMLElement | ElementRef<HTMLElement>
  ): void;
}

@Directive({
  selector: '[neo-ripple], [neoRipple]',
  exportAs: 'neoRipple',
  host: {
    class: 'neo-ripple',
  },
})
export class NeoRipple implements OnInit {
  /** Custom color for all ripples. */
  @Input('neoRippleColor') color: string;

  /**
   * Whether the ripple always originates from the center of the host element's bounds, rather
   * than originating from the location of the click event.
   */
  @Input('neoRippleCentered') centered: boolean;

  /**
   * If set, the radius in pixels of foreground ripples when fully expanded. If unset, the radius
   * will be the distance from the center of the ripple to the furthest corner of the host element's
   * bounding rectangle.
   */
  @Input('neoRippleRadius') radius = 0;

  /**
   * Configuration for the ripple animation. Allows modifying the enter and exit animation
   * duration of the ripples. The animation durations will be overwritten if the
   * `NoopAnimationsModule` is being used.
   */
  @Input('neoRippleAnimation') animation: RippleAnimationConfig;

  /**
   * Whether click events will not trigger the ripple. Ripples can be still launched manually
   * by using the `launch()` method.
   */
  @Input('neoRippleDisabled')
  get disabled() {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = value;
    this._setupTriggerEventsIfEnabled();
  }
  private _disabled = false;

  /**
   * The element that triggers the ripple when click events are received.
   * Defaults to the directive's host element.
   */
  @Input('neoRippleTrigger')
  get trigger() {
    return this._trigger || this._elementRef.nativeElement;
  }
  set trigger(trigger: HTMLElement) {
    this._trigger = trigger;
    this._setupTriggerEventsIfEnabled();
  }
  private _trigger: HTMLElement;

  /** Renderer for the ripple DOM manipulations. */
  private _rippleRenderer: CommonRippleRenderer;

  /** Options that are set globally for all ripples. */
  private _globalOptions: RippleGlobalOptions;

  /** Whether ripple directive is initialized and the input bindings are set. */
  private _isInitialized = false;

  constructor(
    private _elementRef: ElementRef<HTMLElement>,
    ngZone: NgZone,
    platform: Platform,
    @Optional()
    @Inject(MAT_RIPPLE_GLOBAL_OPTIONS)
    globalOptions?: RippleGlobalOptions,
    @Optional() @Inject(ANIMATION_MODULE_TYPE) private _animationMode?: string,
    @Optional() @Inject(RIPPLE_TYPE) private _rippleType?: RIPPLE_TYPES
  ) {
    this._globalOptions = globalOptions || {};
    this._rippleRenderer =
      !_rippleType || _rippleType === RIPPLE_TYPES.NEO
        ? new NeoRippleRenderer(
            this,
            ngZone,
            _elementRef.nativeElement.parentElement,
            platform
          )
        : new RippleRenderer(this, ngZone, _elementRef, platform);
  }

  public ngOnInit(): void {
    this._isInitialized = true;
    this._setupTriggerEventsIfEnabled();
  }

  /**
   * Ripple configuration from the directive's input values.
   * @docs-private Implemented as part of RippleTarget
   */
  get rippleConfig(): RippleConfig {
    return {
      centered: this.centered,
      radius: this.radius,
      color: this.color,
      animation: {
        ...this._globalOptions.animation,
        ...(this._animationMode === 'NoopAnimations'
          ? { enterDuration: 0, exitDuration: 0 }
          : {}),
        ...this.animation,
      },
      terminateOnPointerUp: this._globalOptions.terminateOnPointerUp,
    };
  }

  /**
   * Whether ripples on pointer-down are disabled or not.
   * @docs-private Implemented as part of RippleTarget
   */
  get rippleDisabled(): boolean {
    return this.disabled || !!this._globalOptions.disabled;
  }

  /** Sets up the trigger event listeners if ripples are enabled. */
  private _setupTriggerEventsIfEnabled(): void {
    if (!this.disabled && this._isInitialized) {
      this._rippleRenderer.setupTriggerEvents(this.trigger);
    }
  }
}
