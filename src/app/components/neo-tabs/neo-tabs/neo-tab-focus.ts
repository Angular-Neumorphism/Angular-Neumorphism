/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
  Directive,
  ElementRef,
  Inject,
  InjectionToken,
  NgZone,
  Optional,
  ChangeDetectorRef,
} from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';

/**
 * Interface for a a MatInkBar positioner method, defining the positioning and width of the ink
 * bar in a set of tabs.
 */
// tslint:disable-next-line class-name Using leading underscore to denote internal interface.
export interface _NeoFocusPositioner {
  (element: HTMLElement): { left: string; width: string };
}

/** Injection token for the FicusHighlight's Positioner. */
export const _NEO_FOCUS_POSITIONER = new InjectionToken<_NeoFocusPositioner>(
  'NeoFocusPositioner',
  {
    providedIn: 'root',
    factory: _NEO_FOCUS_POSITIONER_FACTORY,
  }
);

/**
 * The default positioner function for the MatInkBar.
 * @docs-private
 */
export function _NEO_FOCUS_POSITIONER_FACTORY(): _NeoFocusPositioner {
  const method = (element: HTMLElement) => ({
    left: element ? (element.offsetLeft || 0) + 'px' : '0',
    width: element ? (element.offsetWidth || 0) + 'px' : '0',
  });

  return method;
}

/**
 * The ink-bar is used to display and animate the line underneath the current active tab label.
 * @docs-private
 */
@Directive({
  selector: 'neo-focused',
  host: {
    class: 'neo-focused-tab',
    '[class._mat-animation-noopable]': `_animationMode === 'NoopAnimations'`,
  },
})
export class NeoFocusPosition {
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _elementRef: ElementRef<HTMLElement>,
    private _ngZone: NgZone,
    @Inject(_NEO_FOCUS_POSITIONER)
    private _neoFocusPositioner: _NeoFocusPositioner,
    @Optional() @Inject(ANIMATION_MODULE_TYPE) public _animationMode?: string
  ) {}

  /**
   * Calculates the styles from the provided element in order to align the ink-bar to that element.
   * Shows the ink bar if previously set as hidden.
   * @param element
   */
  alignToElement(element: HTMLElement) {
    this.show();

    if (typeof requestAnimationFrame !== 'undefined') {
      this._ngZone.runOutsideAngular(() => {
        requestAnimationFrame(() => this._setStyles(element));
      });
    } else {
      this._setStyles(element);
    }
  }

  /** Shows the ink bar. */
  show(): void {
    this._elementRef.nativeElement.style.visibility = 'visible';
  }

  /** Hides the ink bar. */
  hide(): void {
    this._elementRef.nativeElement.style.visibility = 'hidden';
  }

  /**
   * Sets the proper styles to the ink bar element.
   * @param element
   */
  private _setStyles(element: HTMLElement) {
    const positions = this._neoFocusPositioner(element);
    const inkBar: HTMLElement = this._elementRef.nativeElement;
    inkBar.style.left = positions.left;
    inkBar.style.width = positions.width;
    this._changeDetectorRef.detectChanges();
  }
}
