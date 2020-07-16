/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { Directionality } from '@angular/cdk/bidi';
import { ViewportRuler } from '@angular/cdk/scrolling';
import {
  AfterContentChecked,
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  NgZone,
  OnDestroy,
  TemplateRef,
  ContentChild,
  Optional,
  QueryList,
  ViewChild,
  ViewEncapsulation,
  AfterViewInit,
  Input,
  Inject,
  Directive,
  ViewChildren,
} from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { NeoFocusPosition } from './neo-tab-focus';
import { NeoTabLabelWrapper } from './neo-tab-label-wrapper';
import { Platform } from '@angular/cdk/platform';
import { NeoPaginatedTabHeader } from './paginated-tab-header';

/**
 * Base class with all of the `MatTabHeader` functionality.
 * @docs-private
 */
@Directive()
// tslint:disable-next-line:class-name
export abstract class _NeoTabHeaderBase extends NeoPaginatedTabHeader
  implements AfterContentChecked, AfterContentInit, AfterViewInit, OnDestroy {
  /** Whether the ripple effect is disabled or not. */
  @Input()
  get disableRipple() {
    return this._neoDisableRipple;
  }
  set disableRipple(value: any) {
    this._neoDisableRipple = coerceBooleanProperty(value);
  }
  private _neoDisableRipple: boolean = false;

  constructor(
    elementRef: ElementRef,
    changeDetectorRef: ChangeDetectorRef,
    viewportRuler: ViewportRuler,
    @Optional() dir: Directionality,
    ngZone: NgZone,
    platform: Platform,
    // @breaking-change 9.0.0 `_animationMode` parameter to be made required.
    @Optional() @Inject(ANIMATION_MODULE_TYPE) animationMode?: string
  ) {
    super(
      elementRef,
      changeDetectorRef,
      viewportRuler,
      dir,
      ngZone,
      platform,
      animationMode
    );
  }

  protected _itemSelected(event: KeyboardEvent) {
    event.preventDefault();
  }
}

/**
 * The header of the tab group which displays a list of all the tabs in the tab group. Includes
 * an ink bar that follows the currently selected tab. When the tabs list's width exceeds the
 * width of the header container, then arrows will be displayed to allow the user to scroll
 * left and right across the header.
 * @docs-private
 */
@Component({
  selector: 'neo-tab-header',
  templateUrl: 'neo-tab-header.html',
  styleUrls: ['neo-tab-header.scss'],
  inputs: ['selectedIndex'],
  outputs: ['selectFocusedIndex', 'indexFocused'],
  encapsulation: ViewEncapsulation.None,
  // tslint:disable-next-line:validate-decorators
  changeDetection: ChangeDetectionStrategy.Default,
  host: {
    class: 'neo-tab-header',
    '[class.neo-tab-header-pagination-controls-enabled]':
      '_showPaginationControls',
    '[class.neo-tab-header-rtl]': "_getLayoutDirection() == 'rtl'",
  },
})
export class NeoTabHeader extends _NeoTabHeaderBase implements AfterViewInit {
  public _inkBar: NeoFocusPosition;
  @ContentChildren(NeoTabLabelWrapper, { descendants: false })
  _items: QueryList<NeoTabLabelWrapper>;
  @ViewChild('tabListContainer', { static: true })
  _tabListContainer: ElementRef;
  @ViewChild('tabList', { static: true }) _tabList: ElementRef;
  @ViewChild('nextPaginator') _nextPaginator: ElementRef<HTMLElement>;
  @ViewChild('previousPaginator') _previousPaginator: ElementRef<HTMLElement>;
  @ViewChild('focusTemplateRef') rt: ElementRef;

  @Input()
  focusTemplateRef: TemplateRef<NeoFocusPosition>;
  @Input()
  focusedRef: NeoFocusPosition;

  constructor(
    elementRef: ElementRef,
    changeDetectorRef: ChangeDetectorRef,
    viewportRuler: ViewportRuler,
    @Optional() dir: Directionality,
    ngZone: NgZone,
    platform: Platform,
    // @breaking-change 9.0.0 `_animationMode` parameter to be made required.
    @Optional() @Inject(ANIMATION_MODULE_TYPE) animationMode?: string
  ) {
    super(
      elementRef,
      changeDetectorRef,
      viewportRuler,
      dir,
      ngZone,
      platform,
      animationMode
    );
  }

  ngAfterViewInit() {
    this._inkBar = this.focusedRef;
  }


  static ngAcceptInputType_disableRipple: BooleanInput;
}
