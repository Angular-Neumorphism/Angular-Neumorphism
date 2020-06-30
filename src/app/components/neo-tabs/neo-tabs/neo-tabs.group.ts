/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
  BooleanInput,
  coerceBooleanProperty,
  coerceNumberProperty,
  NumberInput,
} from '@angular/cdk/coercion';
import {
  AfterContentChecked,
  AfterContentInit,
  ContentChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  Optional,
  Output,
  QueryList,
  ViewChild,
  ViewEncapsulation,
  AfterViewInit,
} from '@angular/core';
import {
  CanColor,
  CanDisableRipple,
  ThemePalette,
} from '@angular/material/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { merge, Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { MAT_TAB_GROUP, NeoTab } from './neo-tabs.component';
import { MAT_TABS_CONFIG, MatTabsConfig } from './neo-tab-config';
import * as MatTabsModule from '@angular/material/tabs';

import { NeoFocusPosition } from './neo-tab-focus';

/** Used to generate unique ID's for each tab component */
let nextId = 0;

/** A simple change event emitted on focus or selection changes. */
export class NeoTabChangeEvent {
  /** Index of the currently-selected tab. */
  index: number;
  /** Reference to the currently-selected tab. */
  tab: NeoTab;
}

/** Possible positions for the tab header. */
export type NeoTabHeaderPosition = 'above' | 'below';

interface NeoTabGroupBaseHeader {
  _alignInkBarToSelectedTab: () => void;
  focusIndex: number;
}

/**
 * Base class with all of the `MatTabGroupBase` functionality.
 * @docs-private
 */
@Directive()
// tslint:disable-next-line:class-name
export abstract class _NeoTabGroupBase extends MatTabsModule._MatTabGroupBase
  implements
    AfterContentInit,
    AfterContentChecked,
    OnDestroy,
    CanColor,
    CanDisableRipple {
  /**
   * All tabs inside the tab group. This includes tabs that belong to groups that are nested
   * inside the current one. We filter out only the tabs that belong to this group in `_tabs`.
   */
  abstract _allTabs: QueryList<NeoTab>;
  abstract _tabBodyWrapper: ElementRef;
  abstract _tabHeader: NeoTabGroupBaseHeader;

  /** All of the tabs that belong to the group. */
  _tabs: QueryList<NeoTab> = new QueryList<NeoTab>();

  /** The tab index that should be selected after the content has been checked. */
  private _neoIndexToSelect: number | null = 0;

  /** Snapshot of the height of the tab body wrapper before another tab is activated. */
  private _neoTabBodyWrapperHeight: number = 0;

  /** Subscription to tabs being added/removed. */
  private _neoTabsSubscription = Subscription.EMPTY;

  /** Subscription to changes in the tab labels. */
  private _neoTabLabelSubscription = Subscription.EMPTY;

  /** Whether the tab group should grow to the size of the active tab. */
  @Input()
  get dynamicHeight(): boolean {
    return this._neoDynamicHeight;
  }
  set dynamicHeight(value: boolean) {
    this._neoDynamicHeight = coerceBooleanProperty(value);
  }
  private _neoDynamicHeight: boolean = false;

  /** The index of the active tab. */
  @Input()
  get selectedIndex(): number | null {
    return this._neoSelectedIndex;
  }
  set selectedIndex(value: number | null) {
    this._neoIndexToSelect = coerceNumberProperty(value, null);
  }
  private _neoSelectedIndex: number | null = null;

  /** Position of the tab header. */
  @Input() headerPosition: NeoTabHeaderPosition = 'above';

  /** Duration for the tab animation. Will be normalized to milliseconds if no units are set. */
  @Input()
  get animationDuration(): string {
    return this._neoAnimationDuration;
  }
  set animationDuration(value: string) {
    this._neoAnimationDuration = /^\d+$/.test(value) ? value + 'ms' : value;
  }
  private _neoAnimationDuration: string;

  /**
   * Whether pagination should be disabled. This can be used to avoid unnecessary
   * layout recalculations if it's known that pagination won't be required.
   */
  @Input()
  disablePagination: boolean;

  /** Background color of the tab group. */
  // @Input()
  // get backgroundColor(): ThemePalette {
  //   return this._neoBackgroundColor;
  // }
  // set backgroundColor(value: ThemePalette) {
  //   const nativeElement: HTMLElement = this._elementRef.nativeElement;

  //   nativeElement.classList.remove(`mat-background-${this.backgroundColor}`);

  //   if (value) {
  //     nativeElement.classList.add(`mat-background-${value}`);
  //   }

  //   this._neoBackgroundColor = value;
  // }
  // private _neoBackgroundColor: ThemePalette;

  /** Output to enable support for two-way binding on `[(selectedIndex)]` */
  @Output() readonly selectedIndexChange: EventEmitter<
    number
  > = new EventEmitter<number>();

  /** Event emitted when focus has changed within a tab group. */
  @Output() readonly focusChange: EventEmitter<
    NeoTabChangeEvent
  > = new EventEmitter<NeoTabChangeEvent>();

  /** Event emitted when the body animation has completed */
  @Output() readonly animationDone: EventEmitter<void> = new EventEmitter<
    void
  >();

  /** Event emitted when the tab selection has changed. */
  @Output() readonly selectedTabChange: EventEmitter<
    NeoTabChangeEvent
  > = new EventEmitter<NeoTabChangeEvent>(true);

  private _neoGroupId: number;

  constructor(
    elementRef: ElementRef,
    protected _changeDetectorRef: ChangeDetectorRef,
    @Inject(MAT_TABS_CONFIG) @Optional() defaultConfig?: MatTabsConfig,
    @Optional() @Inject(ANIMATION_MODULE_TYPE) public _animationMode?: string
  ) {
    super(elementRef, _changeDetectorRef, defaultConfig, _animationMode);
    this._neoGroupId = nextId++;
    this.animationDuration =
      defaultConfig && defaultConfig.animationDuration
        ? defaultConfig.animationDuration
        : '500ms';
    this.disablePagination =
      defaultConfig && defaultConfig.disablePagination != null
        ? defaultConfig.disablePagination
        : false;
  }

  /**
   * After the content is checked, this component knows what tabs have been defined
   * and what the selected index should be. This is where we can know exactly what position
   * each tab should be in according to the new selected index, and additionally we know how
   * a new selected tab should transition in (from the left or right).
   */
  ngAfterContentChecked() {
    // Don't clamp the `indexToSelect` immediately in the setter because it can happen that
    // the amount of tabs changes before the actual change detection runs.
    const indexToSelect = (this._neoIndexToSelect = this._neoClampTabIndex(
      this._neoIndexToSelect
    ));

    // If there is a change in selected index, emit a change event. Should not trigger if
    // the selected index has not yet been initialized.
    if (this._neoSelectedIndex != indexToSelect) {
      const isFirstRun = this._neoSelectedIndex == null;

      if (!isFirstRun) {
        this.selectedTabChange.emit(this._neoCreateChangeEvent(indexToSelect));
      }

      // Changing these values after change detection has run
      // since the checked content may contain references to them.
      Promise.resolve().then(() => {
        this._tabs.forEach(
          (tab, index) => (tab.isActive = index === indexToSelect)
        );

        if (!isFirstRun) {
          this.selectedIndexChange.emit(indexToSelect);
        }
      });
    }

    // Setup the position for each tab and optionally setup an origin on the next selected tab.
    this._tabs.forEach((tab: NeoTab, index: number) => {
      tab.position = index - indexToSelect;

      // If there is already a selected tab, then set up an origin for the next selected tab
      // if it doesn't have one already.
      if (this._neoSelectedIndex != null && tab.position == 0 && !tab.origin) {
        tab.origin = indexToSelect - this._neoSelectedIndex;
      }
    });

    if (this._neoSelectedIndex !== indexToSelect) {
      this._neoSelectedIndex = indexToSelect;
      this._changeDetectorRef.markForCheck();
    }
  }

  ngAfterContentInit() {
    this._neoSubscribeToAllTabChanges();
    this._neoSubscribeToTabLabels();

    // Subscribe to changes in the amount of tabs, in order to be
    // able to re-render the content as new tabs are added or removed.
    this._neoTabsSubscription = this._tabs.changes.subscribe(() => {
      const indexToSelect = this._neoClampTabIndex(this._neoIndexToSelect);

      // Maintain the previously-selected tab if a new tab is added or removed and there is no
      // explicit change that selects a different tab.
      if (indexToSelect === this._neoSelectedIndex) {
        const tabs = this._tabs.toArray();

        for (let i = 0; i < tabs.length; i++) {
          if (tabs[i].isActive) {
            // Assign both to the `_neoIndexToSelect` and `_neoSelectedIndex` so we don't fire a changed
            // event, otherwise the consumer may end up in an infinite loop in some edge cases like
            // adding a tab within the `selectedIndexChange` event.
            this._neoIndexToSelect = this._neoSelectedIndex = i;
            break;
          }
        }
      }

      this._changeDetectorRef.markForCheck();
    });
  }

  /** Listens to changes in all of the tabs. */
  private _neoSubscribeToAllTabChanges() {
    // Since we use a query with `descendants: true` to pick up the tabs, we may end up catching
    // some that are inside of nested tab groups. We filter them out manually by checking that
    // the closest group to the tab is the current one.
    this._allTabs.changes
      .pipe(startWith(this._allTabs))
      .subscribe((tabs: QueryList<NeoTab>) => {
        this._tabs.reset(
          tabs.filter((tab) => {
            // @breaking-change 10.0.0 Remove null check for `_closestTabGroup`
            // once it becomes a required parameter in MatTab.
            return !tab._closestTabGroup || tab._closestTabGroup === this;
          })
        );
        this._tabs.notifyOnChanges();
      });
  }

  ngOnDestroy() {
    this._tabs.destroy();
    this._neoTabsSubscription.unsubscribe();
    this._neoTabLabelSubscription.unsubscribe();
  }

  /** Re-aligns the ink bar to the selected tab element. */
  realignInkBar() {
    if (this._tabHeader) {
      this._tabHeader._alignInkBarToSelectedTab();
    }
  }

  _focusChanged(index: number) {
    this.focusChange.emit(this._neoCreateChangeEvent(index));
  }

  private _neoCreateChangeEvent(index: number): NeoTabChangeEvent {
    const event = new NeoTabChangeEvent();
    event.index = index;
    if (this._tabs && this._tabs.length) {
      event.tab = this._tabs.toArray()[index];
    }
    return event;
  }

  /**
   * Subscribes to changes in the tab labels. This is needed, because the @Input for the label is
   * on the MatTab component, whereas the data binding is inside the MatTabGroup. In order for the
   * binding to be updated, we need to subscribe to changes in it and trigger change detection
   * manually.
   */
  private _neoSubscribeToTabLabels() {
    if (this._neoTabLabelSubscription) {
      this._neoTabLabelSubscription.unsubscribe();
    }

    this._neoTabLabelSubscription = merge(
      ...this._tabs.map((tab) => tab._stateChanges)
    ).subscribe(() => this._changeDetectorRef.markForCheck());
  }

  /** Clamps the given index to the bounds of 0 and the tabs length. */
  private _neoClampTabIndex(index: number | null): number {
    // Note the `|| 0`, which ensures that values like NaN can't get through
    // and which would otherwise throw the component into an infinite loop
    // (since Math.max(NaN, 0) === NaN).
    return Math.min(this._tabs.length - 1, Math.max(index || 0, 0));
  }

  /** Returns a unique id for each tab label element */
  _getTabLabelId(i: number): string {
    return `neo-tab-label-${this._neoGroupId}-${i}`;
  }

  /** Returns a unique id for each tab content element */
  _getTabContentId(i: number): string {
    return `neo-tab-content-${this._neoGroupId}-${i}`;
  }

  /**
   * Sets the height of the body wrapper to the height of the activating tab if dynamic
   * height property is true.
   */
  _setTabBodyWrapperHeight(tabHeight: number): void {
    if (!this._neoDynamicHeight || !this._neoTabBodyWrapperHeight) {
      return;
    }

    const wrapper: HTMLElement = this._tabBodyWrapper.nativeElement;

    wrapper.style.height = this._neoTabBodyWrapperHeight + 'px';

    // This conditional forces the browser to paint the height so that
    // the animation to the new height can have an origin.
    if (this._tabBodyWrapper.nativeElement.offsetHeight) {
      wrapper.style.height = tabHeight + 'px';
    }
  }

  /** Removes the height of the tab body wrapper. */
  _removeTabBodyWrapperHeight(): void {
    const wrapper = this._tabBodyWrapper.nativeElement;
    this._neoTabBodyWrapperHeight = wrapper.clientHeight;
    wrapper.style.height = '';
    this.animationDone.emit();
  }

  /** Handle click events, setting new selected index if appropriate. */
  _handleClick(
    tab: NeoTab,
    neoTabHeader: NeoTabGroupBaseHeader,
    index: number
  ) {
    if (!tab.disabled) {
      this.selectedIndex = neoTabHeader.focusIndex = index;
    }
  }

  /** Retrieves the tabindex for the tab. */
  _getTabIndex(tab: NeoTab, idx: number): number | null {
    if (tab.disabled) {
      return null;
    }
    return this.selectedIndex === idx ? 0 : -1;
  }

  static ngAcceptInputType_dynamicHeight: BooleanInput;
  static ngAcceptInputType_animationDuration: NumberInput;
  static ngAcceptInputType_selectedIndex: NumberInput;
  static ngAcceptInputType_disableRipple: BooleanInput;
}

/**
 * Material design tab-group component. Supports basic tab pairs (label + content) and includes
 * animated ink-bar, keyboard navigation, and screen reader.
 * See: https://material.io/design/components/tabs.html
 */
@Component({
  selector: 'neo-tab-group',
  exportAs: 'neoTabGroup',
  templateUrl: 'neo-tab-group.html',
  styleUrls: ['neo-tab-group.scss'],
  encapsulation: ViewEncapsulation.None,
  // tslint:disable-next-line:validate-decorators
  changeDetection: ChangeDetectionStrategy.Default,
  inputs: ['color'],
  providers: [
    {
      provide: MAT_TAB_GROUP,
      useExisting: NeoTabGroup,
    },
  ],
  host: {
    class: 'neo-tab-group',
    '[class.neo-tab-group-dynamic-height]': 'dynamicHeight',
    '[class.neo-tab-group-inverted-header]': 'headerPosition === "below"',
  },
})
export class NeoTabGroup extends _NeoTabGroupBase {
  @ContentChildren(NeoTab, { descendants: true }) _allTabs: QueryList<NeoTab>;
  @ViewChild('tabBodyWrapper') _tabBodyWrapper: ElementRef;
  @ViewChild('neoTabHeader') _tabHeader: NeoTabGroupBaseHeader;

  @ContentChild(NeoFocusPosition) focusedRef: NeoFocusPosition;

  constructor(
    elementRef: ElementRef,
    changeDetectorRef: ChangeDetectorRef,
    @Inject(MAT_TABS_CONFIG) @Optional() defaultConfig?: MatTabsConfig,
    @Optional() @Inject(ANIMATION_MODULE_TYPE) animationMode?: string
  ) {
    super(elementRef, changeDetectorRef, defaultConfig, animationMode);
  }
}
