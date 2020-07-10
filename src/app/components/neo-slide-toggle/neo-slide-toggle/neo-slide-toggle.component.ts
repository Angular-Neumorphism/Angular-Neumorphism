/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput } from '@angular/cdk/coercion';
import {
  AfterContentInit,
  Attribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  ViewEncapsulation,
  OnDestroy,
  NgZone,
  Inject,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { MatSlideToggle } from '@angular/material/slide-toggle';
import {
  NEO_SLIDE_TOGGLE_DEFAULT_OPTIONS,
  NeoSlideToggleDefaultOptions,
} from './neo-slide-toggle-config';

// Increasing integer for generating unique ids for slide-toggle components.
let nextUniqueId = 0;

/** @docs-private */
export const MAT_SLIDE_TOGGLE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MatSlideToggle),
  multi: true,
};

/** Represents a slidable "switch" toggle that can be moved between on and off. */
@Component({
  selector: 'neo-slide-toggle',
  exportAs: 'neoSlideToggle',
  host: {
    class: 'neo-slide-toggle',
    '[id]': 'id',
    // Needs to be `-1` so it can still receive programmatic focus.
    '[attr.tabindex]': 'disabled ? null : -1',
    '[attr.aria-label]': 'null',
    '[attr.aria-labelledby]': 'null',
    '[class.neo-toggle-checked]': 'checked',
    '[class.neo-toggle-disabled]': 'disabled',
    '[class.neo-slide-toggle-label-before]': 'labelPosition == "before"',
    '[class._mat-animation-noopable]': '_animationMode === "NoopAnimations"',
  },
  templateUrl: 'neo-slide-toggle.component.html',
  styleUrls: ['neo-slide-toggle.component.scss'],
  providers: [MAT_SLIDE_TOGGLE_VALUE_ACCESSOR],
  inputs: ['disabled', 'disableRipple', 'color', 'tabIndex'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NeoSlideToggle extends MatSlideToggle
  implements AfterContentInit, OnDestroy {
  // tslint:disable-next-line:variable-name
  static ngAcceptInputType_required: BooleanInput;
  // tslint:disable-next-line:variable-name
  static ngAcceptInputType_checked: BooleanInput;
  // tslint:disable-next-line:variable-name
  static ngAcceptInputType_disabled: BooleanInput;
  // tslint:disable-next-line:variable-name
  static ngAcceptInputType_disableRipple: BooleanInput;

  constructor(
    elementRef: ElementRef,
    private _neoFocusMonitor: FocusMonitor,
    private _neoChangeDetectorRef: ChangeDetectorRef,
    @Attribute('tabindex') tabIndex: string,
    ngZone: NgZone,
    @Inject(NEO_SLIDE_TOGGLE_DEFAULT_OPTIONS)
    public neoDefaults: NeoSlideToggleDefaultOptions
  ) {
    super(
      elementRef,
      _neoFocusMonitor,
      _neoChangeDetectorRef,
      tabIndex,
      ngZone,
      neoDefaults,
      null
    );
    this.tabIndex = parseInt(tabIndex) || 0;
  }

  ngAfterContentInit() {
    super.ngAfterContentInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  // static ngAcceptInputType_required: BooleanInput;
  // static ngAcceptInputType_checked: BooleanInput;
  // static ngAcceptInputType_disabled: BooleanInput;
  // static ngAcceptInputType_disableRipple: BooleanInput;
}
