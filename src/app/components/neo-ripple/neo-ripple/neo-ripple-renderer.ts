import { ElementRef, NgZone } from '@angular/core';
import {
  Platform,
  normalizePassiveListenerOptions,
} from '@angular/cdk/platform';
import { isFakeMousedownFromScreenReader } from '@angular/cdk/a11y';
import { coerceElement } from '@angular/cdk/coercion';
import { RippleRef, RippleState, RippleConfig } from './ripple-ref';
import rgbHex from 'rgb-hex';
import { TimelineMax, gsap } from 'gsap';
import { CSSPlugin } from 'gsap/CSSPlugin';

/**
 * Interface that describes the target for launching ripples.
 * It defines the ripple configuration and disabled state for interaction ripples.
 * @docs-private
 */
export interface RippleTarget {
  /** Configuration for ripples that are launched on pointer down. */
  rippleConfig: RippleConfig;
  /** Whether ripples on pointer down should be disabled. */
  rippleDisabled: boolean;
}

/**
 * Default ripple animation configuration for ripples without an explicit
 * animation config specified.
 */
export const defaultRippleAnimationConfig = {
  enterDuration: 450,
  exitDuration: 400,
};

/**
 * Timeout for ignoring mouse events. Mouse events will be temporary ignored after touch
 * events to avoid synthetic mouse events.
 */
const ignoreMouseEventsTimeout = 800;

/** Options that apply to all the event listeners that are bound by the ripple renderer. */
const passiveEventOptions = normalizePassiveListenerOptions({ passive: true });

/** Events that signal that the pointer is down. */
const pointerDownEvents = ['mousedown', 'touchstart'];

/** Events that signal that the pointer is up. */
const pointerUpEvents = ['mouseup', 'mouseleave', 'touchend', 'touchcancel'];

/**
 * Helper service that performs DOM manipulations. Not intended to be used outside this module.
 * The constructor takes a reference to the ripple directive's host element and a map of DOM
 * event handlers to be installed on the element that triggers ripple animations.
 * This will eventually become a custom renderer once Angular support exists.
 * @docs-private
 */
export class NeoRippleRenderer implements EventListenerObject {
  /** Element where the ripples are being added to. */
  private _containerElement: HTMLElement;

  /** Element which triggers the ripple elements on mouse events. */
  private _triggerElement: HTMLElement | null;

  /** Whether the pointer is currently down or not. */
  private _isPointerDown = false;

  /** Set of currently active ripple references. */
  private _activeRipples = new Set<RippleRef>();

  /** Latest non-persistent ripple that was triggered. */
  private _mostRecentTransientRipple: RippleRef | null;

  /** Time in milliseconds when the last touchstart event happened. */
  private _lastTouchStartEvent: number;

  /** Whether pointer-up event listeners have been registered. */
  private _pointerUpEventsRegistered = false;

  /**
   * Cached dimensions of the ripple container. Set when the first
   * ripple is shown and cleared once no more ripples are visible.
   */
  private _containerRect: ClientRect | null;

  constructor(
    private _target: RippleTarget,
    private _ngZone: NgZone,
    elementOrElementRef: HTMLElement | ElementRef<HTMLElement>,
    platform: Platform
  ) {
    // Only do anything if we're on the browser.
    if (platform.isBrowser) {
      this._containerElement = coerceElement(elementOrElementRef);
    }

    gsap.registerPlugin(CSSPlugin);
  }

  /**
   * Fades in a ripple at the given coordinates.
   * @param x Coordinate within the element, along the X axis at which to start the ripple.
   * @param y Coordinate within the element, along the Y axis at which to start the ripple.
   * @param config Extra ripple options.
   */
  fadeInRipple(
    currentTarget: HTMLElement,
    x: number,
    y: number,
    config: RippleConfig = {}
  ): RippleRef {
    const { svg, circle } = this._renderSvg(this._containerElement);

    const animationConfig = {
      ...defaultRippleAnimationConfig,
      ...config.animation,
    };

    const duration = animationConfig.enterDuration;

    this._animate(x, y, duration, currentTarget, circle);

    // By default the browser does not recalculate the styles of dynamically created
    // ripple elements. This is critical because then the `scale` would not animate properly.
    enforceStyleRecalculation(svg);

    // ripple.style.transform = 'scale(1)';

    // Exposed reference to the ripple that will be returned.
    const rippleRef = new RippleRef(this, svg, config);

    rippleRef.state = RippleState.FADING_IN;

    // Add the ripple reference to the list of all active ripples.
    this._activeRipples.add(rippleRef);

    if (!config.persistent) {
      this._mostRecentTransientRipple = rippleRef;
    }

    // Wait for the ripple element to be completely faded in.
    // Once it's faded in, the ripple can be hidden immediately if the mouse is released.
    this._runTimeoutOutsideZone(() => {
      const isMostRecentTransientRipple =
        rippleRef === this._mostRecentTransientRipple;

      rippleRef.state = RippleState.VISIBLE;

      // When the timer runs out while the user has kept their pointer down, we want to
      // keep only the persistent ripples and the latest transient ripple. We do this,
      // because we don't want stacked transient ripples to appear after their enter
      // animation has finished.
      if (
        !config.persistent &&
        (!isMostRecentTransientRipple || !this._isPointerDown)
      ) {
        rippleRef.fadeOut();
      }
    }, duration);

    return rippleRef;
  }

  /** Fades out a ripple reference. */
  fadeOutRipple(rippleRef: RippleRef) {
    const wasActive = this._activeRipples.delete(rippleRef);

    if (rippleRef === this._mostRecentTransientRipple) {
      this._mostRecentTransientRipple = null;
    }

    // Clear out the cached bounding rect if we have no more ripples.
    if (!this._activeRipples.size) {
      this._containerRect = null;
    }

    // For ripples that are not active anymore, don't re-run the fade-out animation.
    if (!wasActive) {
      return;
    }

    const rippleEl = rippleRef.element;
    const animationConfig = {
      ...defaultRippleAnimationConfig,
      ...rippleRef.config.animation,
    };

    rippleRef.state = RippleState.FADING_OUT;

    // Once the ripple faded out, the ripple can be safely removed from the DOM.
    this._runTimeoutOutsideZone(() => {
      rippleRef.state = RippleState.HIDDEN;
      rippleEl.parentNode!.removeChild(rippleEl);
    }, animationConfig.exitDuration);
  }

  /** Fades out all currently active ripples. */
  fadeOutAll() {
    this._activeRipples.forEach((ripple) => ripple.fadeOut());
  }

  /** Sets up the trigger event listeners */
  setupTriggerEvents(
    elementOrElementRef: HTMLElement | ElementRef<HTMLElement>
  ) {
    const element = coerceElement(elementOrElementRef);

    if (!element || element === this._triggerElement) {
      return;
    }

    // Remove all previously registered event listeners from the trigger element.
    this._removeTriggerEvents();

    this._triggerElement = element;
    this._registerEvents(pointerDownEvents);
  }

  /**
   * Handles all registered events.
   * @docs-private
   */
  handleEvent(event: Event) {
    if (event.type === 'mousedown') {
      this._onMousedown(event as MouseEvent);
    } else if (event.type === 'touchstart') {
      this._onTouchStart(event as TouchEvent);
    } else {
      this._onPointerUp();
    }

    // If pointer-up events haven't been registered yet, do so now.
    // We do this on-demand in order to reduce the total number of event listeners
    // registered by the ripples, which speeds up the rendering time for large UIs.
    if (!this._pointerUpEventsRegistered) {
      this._registerEvents(pointerUpEvents);
      this._pointerUpEventsRegistered = true;
    }
  }

  /** Function being called whenever the trigger is being pressed using mouse. */
  private _onMousedown(event: MouseEvent) {
    // Screen readers will fire fake mouse events for space/enter. Skip launching a
    // ripple in this case for consistency with the non-screen-reader experience.
    const isFakeMousedown = isFakeMousedownFromScreenReader(event);
    const isSyntheticEvent =
      this._lastTouchStartEvent &&
      Date.now() < this._lastTouchStartEvent + ignoreMouseEventsTimeout;

    if (!this._target.rippleDisabled && !isFakeMousedown && !isSyntheticEvent) {
      this._isPointerDown = true;
      this.fadeInRipple(
        event.currentTarget as HTMLElement,
        event.clientX,
        event.clientY,
        this._target.rippleConfig
      );
    }
  }

  /** Function being called whenever the trigger is being pressed using touch. */
  private _onTouchStart(event: TouchEvent) {
    if (!this._target.rippleDisabled) {
      // Some browsers fire mouse events after a `touchstart` event. Those synthetic mouse
      // events will launch a second ripple if we don't ignore mouse events for a specific
      // time after a touchstart event.
      this._lastTouchStartEvent = Date.now();
      this._isPointerDown = true;

      // Use `changedTouches` so we skip any touches where the user put
      // their finger down, but used another finger to tap the element again.
      const touches = event.changedTouches;

      for (let i = 0; i < touches.length; i++) {
        this.fadeInRipple(
          event.currentTarget as HTMLElement,
          touches[i].clientX,
          touches[i].clientY,
          this._target.rippleConfig
        );
      }
    }
  }

  /** Function being called whenever the trigger is being released. */
  private _onPointerUp() {
    if (!this._isPointerDown) {
      return;
    }

    this._isPointerDown = false;

    // Fade-out all ripples that are visible and not persistent.
    this._activeRipples.forEach((ripple) => {
      // By default, only ripples that are completely visible will fade out on pointer release.
      // If the `terminateOnPointerUp` option is set, ripples that still fade in will also fade out.
      const isVisible =
        ripple.state === RippleState.VISIBLE ||
        (ripple.config.terminateOnPointerUp &&
          ripple.state === RippleState.FADING_IN);

      if (!ripple.config.persistent && isVisible) {
        ripple.fadeOut();
      }
    });
  }

  /** Runs a timeout outside of the Angular zone to avoid triggering the change detection. */
  private _runTimeoutOutsideZone(fn: Function, delay = 0) {
    this._ngZone.runOutsideAngular(() => setTimeout(fn, delay));
  }

  /** Registers event listeners for a given list of events. */
  private _registerEvents(eventTypes: string[]) {
    this._ngZone.runOutsideAngular(() => {
      eventTypes.forEach((type) => {
        this._triggerElement!.addEventListener(type, this, passiveEventOptions);
      });
    });
  }

  /** Removes previously registered event listeners from the trigger element. */
  _removeTriggerEvents() {
    if (this._triggerElement) {
      pointerDownEvents.forEach((type) => {
        this._triggerElement!.removeEventListener(
          type,
          this,
          passiveEventOptions
        );
      });

      if (this._pointerUpEventsRegistered) {
        pointerUpEvents.forEach((type) => {
          this._triggerElement!.removeEventListener(
            type,
            this,
            passiveEventOptions
          );
        });
      }
    }
  }

  /** Start animation */
  _animate(
    x: number,
    y: number,
    duration: number,
    curTarget: HTMLElement,
    circle: SVGCircleElement
  ) {
    const tl = new TimelineMax();
    const rect = curTarget.getBoundingClientRect();
    const xData = x - rect.left - 3;
    const yData = y - rect.top - 4;
    const w = curTarget.offsetWidth;
    const h = curTarget.offsetHeight;
    const offsetX = Math.abs(w / 2 - xData);
    const offsetY = Math.abs(h / 2 - yData);
    const deltaX = w / 2 + offsetX;
    const deltaY = h / 2 + offsetY;
    const scaleRatio = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));

    tl.fromTo(
      circle,
      duration / 1000,
      {
        x: xData,
        y: yData,
        transformOrigin: '50% 50%',
        scale: 0,
        opacity: 1,
        ease: 'easeIn',
      },
      {
        scale: scaleRatio,
        opacity: 0,
      }
    );
    return tl;
  }

  /** Render svg element which will be animated */
  _renderSvg(htmlElement: HTMLElement) {
    const styles = getComputedStyle(htmlElement);
    const mainColor = `#${rgbHex(styles.backgroundColor)}`;
    const lightColor = colorLuminance(mainColor, 0.15);
    const darkColor = colorLuminance(mainColor, -0.15);

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'ripple-obj');

    svg.setAttribute(
      'style',
      `filter: drop-shadow(1px 1px 1px ${mainColor}) drop-shadow(-1px -1px 1px ${lightColor});
      height: calc(100% - 2px);
      pointer-events: none;
      position: absolute;
      top: 1px;
      left: 1px;
      width: calc(100% - 2px);
      z-index: 0;
      border-radius: 8px;`
    );

    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    svg.appendChild(defs);

    const radialGradient = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'radialGradient'
    );
    radialGradient.id = `gradient-primary-${guid()}`;
    defs.appendChild(radialGradient);

    const offsets = ['0', '0.4', '0.7', '0.9', '1'];
    const colors = [mainColor, lightColor, darkColor, lightColor, mainColor];

    for (let i = 0; i < 5; i++) {
      const stop = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'stop'
      );
      stop.setAttribute('offset', offsets[i]);
      stop.setAttribute('stop-color', colors[i]);
      radialGradient.appendChild(stop);
    }

    const circle = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle'
    );
    circle.setAttribute('cx', '1');
    circle.setAttribute('cy', '1');
    circle.setAttribute('r', '1');
    circle.setAttribute('fill', `url(#${radialGradient.id})`);
    svg.appendChild(circle);

    htmlElement.appendChild(svg);

    return { svg, circle };
  }
}

/** Enforces a style recalculation of a DOM element by computing its styles. */
function enforceStyleRecalculation(element: Element) {
  // Enforce a style recalculation by calling `getComputedStyle` and accessing any property.
  // Calling `getPropertyValue` is important to let optimizers know that this is not a noop.
  // See: https://gist.github.com/paulirish/5d52fb081b3570c81e3a
  window.getComputedStyle(element).getPropertyValue('opacity');
}

/**
 * Returns the distance from the point (x, y) to the furthest corner of a rectangle.
 */
function distanceToFurthestCorner(x: number, y: number, rect: ClientRect) {
  const distX = Math.max(Math.abs(x - rect.left), Math.abs(x - rect.right));
  const distY = Math.max(Math.abs(y - rect.top), Math.abs(y - rect.bottom));
  return Math.sqrt(distX * distX + distY * distY);
}

/**
 * Returns modified color based on lum param
 */
function colorLuminance(hex: string, lum: number): string {
  // validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, '');
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  lum = lum || 0;

  // convert to decimal and change luminosity
  let rgb = '#';
  let i: number;
  let c: string | number;
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
    rgb += ('00' + c).substr(c.length);
  }

  return rgb;
}

/**
 * Returns a random string in format 'aaaa'
 */
function S4(): string {
  // tslint:disable-next-line: no-bitwise
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

/**
 * Returns a random string in format 'aaaa-aaaa-aaaa-aaaa'
 */
function guid(): string {
  return `${S4()}-${S4()}-${S4()}-${S4()}`;
}
