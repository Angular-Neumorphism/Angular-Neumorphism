/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { BooleanInput } from '@angular/cdk/coercion';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
  InjectionToken,
  Inject,
  Optional,
  AfterViewInit,
} from '@angular/core';
import {
  CanDisable,
  CanDisableCtor,
  mixinDisabled,
} from '@angular/material/core';
import { Subject } from 'rxjs';
import { MatTab } from '@angular/material/tabs';
import { NeoTabContent } from './neo-tab-content';
import { NeoTabLabel } from './neo-tab-label';

// Boilerplate for applying mixins to MatTab.
/** @docs-private */
class MatTabBase {}
const _MatTabMixinBase: CanDisableCtor & typeof MatTabBase = mixinDisabled(
  MatTabBase
);

/**
 * Used to provide a tab group to a tab without causing a circular dependency.
 * @docs-private
 */
export const MAT_TAB_GROUP = new InjectionToken<any>('MAT_TAB_GROUP');

@Component({
  selector: 'neo-tab',
  templateUrl: './neo-tabs.component.html',
  styleUrls: ['neo-tabs.component.scss'],
  inputs: ['disabled'],
  // tslint:disable-next-line:validate-decorators
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'neo-tab',
  },
  exportAs: 'neoTab',
})
export class NeoTab extends MatTab
  implements OnInit, CanDisable, OnChanges, OnDestroy {
  /** Content for the tab label given by `<ng-template mat-tab-label>`. */
  @ContentChild(NeoTabLabel)
  get templateLabel(): NeoTabLabel {
    return this._neoTemplateLabel;
  }
  set templateLabel(value: NeoTabLabel) {
    // Only update the templateLabel via query if there is actually
    // a NeoTabLabel found. This works around an issue where a user may have
    // manually set `templateLabel` during creation mode, which would then get clobbered
    // by `undefined` when this query resolves.
    if (value) {
      this._neoTemplateLabel = value;
    }
  }
  private _neoTemplateLabel: NeoTabLabel;

  /**
   * Template provided in the tab content that will be used if present, used to enable lazy-loading
   */
  @ContentChild(NeoTabContent, { read: TemplateRef, static: true })
  _explicitContent: TemplateRef<any>;

  /** Template inside the MatTab view that contains an `<ng-content>`. */
  @ViewChild(TemplateRef, { static: true }) _implicitContent: TemplateRef<any>;

  /** Plain text label for the tab, used when there is no template label. */
  @Input('label') textLabel: string = '';

  /** Aria label for the tab. */
  @Input('aria-label') ariaLabel: string;

  /**
   * Reference to the element that the tab is labelled by.
   * Will be cleared if `aria-label` is set at the same time.
   */
  @Input('aria-labelledby') ariaLabelledby: string;

  /** Portal that will be the hosted content of the tab */
  private _neoContentPortal: TemplatePortal | null = null;

  /** @docs-private */
  get content(): TemplatePortal | null {
    return this._neoContentPortal;
  }

  /** Emits whenever the internal state of the tab changes. */
  readonly _stateChanges = new Subject<void>();

  /**
   * The relatively indexed position where 0 represents the center, negative is left, and positive
   * represents the right.
   */
  position: number | null = null;

  /**
   * The initial relatively index origin of the tab if it was created and selected after there
   * was already a selected tab. Provides context of what position the tab should originate from.
   */
  origin: number | null = null;

  /**
   * Whether the tab is currently active.
   */
  isActive = false;

  constructor(
    private _neoViewContainerRef: ViewContainerRef,
    /**
     * @deprecated `_closestTabGroup` parameter to become required.
     * @breaking-change 10.0.0
     */
    @Optional() @Inject(MAT_TAB_GROUP) public _closestTabGroup?: any
  ) {
    super(_neoViewContainerRef, _closestTabGroup);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.hasOwnProperty('textLabel') ||
      changes.hasOwnProperty('disabled')
    ) {
      this._stateChanges.next();
    }
  }

  ngOnDestroy(): void {
    this._stateChanges.complete();
  }

  ngOnInit(): void {
    this._neoContentPortal = new TemplatePortal(
      this._explicitContent || this._implicitContent,
      this._neoViewContainerRef
    );
  }

  static ngAcceptInputType_disabled: BooleanInput;
}
