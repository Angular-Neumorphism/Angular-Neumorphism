/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {BooleanInput} from '@angular/cdk/coercion';
import {Directive, ElementRef} from '@angular/core';
import {CanDisable, CanDisableCtor, mixinDisabled} from '@angular/material/core';
import * as MatTabsModule from '@angular/material/tabs';


// Boilerplate for applying mixins to MatTabLabelWrapper.
/** @docs-private */
// class MatTabLabelWrapperBase {}
// const _MatTabLabelWrapperMixinBase: CanDisableCtor & typeof MatTabLabelWrapperBase =
//     mixinDisabled(MatTabLabelWrapperBase);

/**
 * Used in the `mat-tab-group` view to display tab labels.
 * @docs-private
 */
@Directive({
  selector: '[neoTabLabelWrapper]',
  inputs: ['disabled'],
  host: {
    '[class.neo-tab-disabled]': 'disabled',
    '[attr.aria-disabled]': '!!disabled',
  }
})
export class NeoTabLabelWrapper extends MatTabsModule.MatTabLabelWrapper implements CanDisable {
  constructor(public elementRef: ElementRef) {
    super(elementRef);
  }

  /** Sets focus on the wrapper element */
  focus(): void {
    this.elementRef.nativeElement.focus();
  }

  getOffsetLeft(): number {
    return this.elementRef.nativeElement.offsetLeft;
  }

  getOffsetWidth(): number {
    return this.elementRef.nativeElement.offsetWidth;
  }

  static ngAcceptInputType_disabled: BooleanInput;
}