import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { Overlay, ScrollStrategy } from '@angular/cdk/overlay';
import { ViewportRuler } from '@angular/cdk/scrolling';
import {
  AfterContentInit,
  Attribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Directive,
  DoCheck,
  ElementRef,
  Inject,
  InjectionToken,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Input,
  Optional,
  QueryList,
  Self,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import {
  ErrorStateMatcher,
  MAT_OPTION_PARENT_COMPONENT,
  MatOptgroup,
} from '@angular/material/core';
import {
  MAT_FORM_FIELD,
  MatFormField,
  MatFormFieldControl,
} from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { SelectionModel } from '@angular/cdk/collections';
export function NEO_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY(
  overlay: Overlay
): () => ScrollStrategy {
  return () => overlay.scrollStrategies.reposition();
}

export interface NeoSelectConfig {
  disableOptionCentering?: boolean;
  typeaheadDebounceInterval?: number;
}

export class NeoSelectChange {
  constructor(public source: NeoSelect, public value: any) {}
}

export const NEO_SELECT_TRIGGER = new InjectionToken<NeoSelectTrigger>(
  'NeoSelectTrigger'
);

@Directive({
  selector: 'neo-select-trigger',
  providers: [{ provide: NEO_SELECT_TRIGGER, useExisting: NeoSelectTrigger }],
})
export class NeoSelectTrigger {}

export interface NeoSelectConfig {
  disableOptionCentering?: boolean;
  typeaheadDebounceInterval?: number;
}

export const NEO_SELECT_SCROLL_STRATEGY = new InjectionToken<
  () => ScrollStrategy
>('mat-select-scroll-strategy');

export const NEO_SELECT_CONFIG = new InjectionToken<NeoSelectConfig>(
  'NEO_SELECT_CONFIG'
);

export const NEO_OPT_GROUP = new InjectionToken<NeoSelectConfig>(
  'NEO_OPT_GROUP'
);

export function MAT_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY(
  overlay: Overlay
): () => ScrollStrategy {
  return () => overlay.scrollStrategies.reposition();
}

export const MAT_SELECT_SCROLL_STRATEGY_PROVIDER = {
  provide: NEO_SELECT_SCROLL_STRATEGY,
  deps: [Overlay],
  useFactory: MAT_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY,
};

let nextUniqueId = 0;

// tslint:disable-next-line:no-conflicting-lifecycle
@Component({
  selector: 'neo-select',
  exportAs: 'neoSelect',
  templateUrl: 'neo-select.component.html',
  styleUrls: ['neo-select.component.scss'],
  inputs: ['disabled', 'disableRipple', 'tabIndex'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'listbox',
    '[attr.id]': 'id',
    '[attr.tabindex]': 'tabIndex',
    '[attr.aria-label]': '_getAriaLabel()',
    '[attr.aria-labelledby]': '_getAriaLabelledby()',
    '[attr.aria-required]': 'required.toString()',
    '[attr.aria-disabled]': 'disabled.toString()',
    '[attr.aria-invalid]': 'errorState',
    '[attr.aria-owns]': 'panelOpen ? _optionIds : null',
    '[attr.aria-multiselectable]': 'multiple',
    '[attr.aria-describedby]': '_ariaDescribedby || null',
    '[attr.aria-activedescendant]': '_getAriaActiveDescendant()',
    '[class.neo-select-disabled]': 'disabled',
    '[class.neo-select-invalid]': 'errorState',
    '[class.neo-select-required]': 'required',
    '[class.neo-select-empty]': 'empty',
    class: 'neo-select',
    '(keydown)': '_handleKeydown($event)',
    '(focus)': '_onFocus()',
    '(blur)': '_onBlur()',
  },
  providers: [
    MAT_SELECT_SCROLL_STRATEGY_PROVIDER,
    { provide: MatFormFieldControl, useExisting: NeoSelect },
    { provide: MAT_OPTION_PARENT_COMPONENT, useExisting: NeoSelect },
  ],
})
export class NeoSelect
  extends MatSelect
  implements AfterContentInit, OnChanges, OnDestroy, OnInit, DoCheck {
    _valueId = `mat-select-value-${nextUniqueId++}`;
    // ngDevMode = undefined

    // @Input()
    // get value(): any { return this._neoValue; }
    // set value(newValue: any) {
    //   if (newValue !== this._neoValue) {
    //     if (this.options) {
    //       this._neoSetSelectionByValue(newValue);
    //     }
  
    //     this._neoValue = newValue;
    //   }
    // }
    // private _neoValue: any;

    private _neoCompareWith = (o1: any, o2: any) => o1 === o2;
  @ContentChildren(NEO_OPT_GROUP as any, { descendants: true })
  optionGroups: QueryList<MatOptgroup>;
  constructor(
    private _neoViewportRuler: ViewportRuler,
    private _neoChangeDetectorRef: ChangeDetectorRef,
    private _neoNgZone: NgZone,
    _defaultErrorStateMatcher: ErrorStateMatcher,
    elementRef: ElementRef,
    @Optional() private _neoDir: Directionality,
    @Optional() _parentForm: NgForm,
    @Optional() _parentFormGroup: FormGroupDirective,
    @Optional()
    @Inject(MAT_FORM_FIELD)
    private _neoParentFormField: MatFormField,
    @Self() @Optional() public ngControl: NgControl,
    @Attribute('tabindex') tabIndex: string,
    @Inject(NEO_SELECT_SCROLL_STRATEGY) scrollStrategyFactory: any,
    private _neoLiveAnnouncer: LiveAnnouncer,
    @Optional() @Inject(NEO_SELECT_CONFIG) defaults?: NeoSelectConfig
  ) {
    super(
      _neoViewportRuler,
      _neoChangeDetectorRef,
      _neoNgZone,
      _defaultErrorStateMatcher,
      elementRef,
      _neoDir,
      _parentForm,
      _parentFormGroup,
      _neoParentFormField,
      ngControl,
      tabIndex,
      scrollStrategyFactory,
      _neoLiveAnnouncer
    );
  }

  // _neoMultiple = false

  ngOnInit() {
    super.ngOnInit();
  //  this._selectionModel = new SelectionModel<any>(this.multiple);
  }

  ngAfterContentInit() {
    super.ngAfterContentInit();
    // this._selectionModel.changed.subscribe((event) => {
    //   console.log(event);
    //   event.added.forEach((option) => option.select());
    //   event.removed.forEach((option) => option.deselect());
    // });
  }

//   get selected(): any {
//     return this.multiple ? this._selectionModel.selected : this._selectionModel.selected[0];
//   }

//   get empty(): boolean {
//     return !this._selectionModel
//   }

//   get triggerValue(): string {
//     if (this.empty) {
//       return '';
//     }

//     if (this._neoMultiple) {
//       const selectedOptions = this._selectionModel.selected.map(option => option.viewValue);

//       if (this._isRtl()) {
//         selectedOptions.reverse();
//       }

//       // TODO(crisbeto): delimiter should be configurable for proper localization.
//       return selectedOptions.join(', ');
//     }
//     return this._selectionModel.selected[0]?.viewValue;
//   }

//   ngDoCheck() {
//     super.ngDoCheck();
//   }

//   ngOnChanges(changes: SimpleChanges) {
//     super.ngOnChanges(changes);
//   }

//   ngOnDestroy() {
//     super.ngOnDestroy();
//   }

//   private _neoSetSelectionByValue(value: any | any[]): void {
//     console.log('_neoSetSelectionByValue=>', value)
//     if (this.multiple && value) {
//       if (!Array.isArray(value) && (typeof this.ngDevMode === 'undefined' || this.ngDevMode)) {
//       //  throw getMatSelectNonArrayValueError();
//       }

//       this._selectionModel.clear();
//       value.forEach((currentValue: any) => this._neoSelectValue(currentValue));
//       this._neoSortValues();
//     } else {
//       this._selectionModel.clear();
//       const correspondingOption = this._neoSelectValue(value);

//       // Shift focus to the active item. Note that we shouldn't do this in multiple
//       // mode, because we don't know what option the user interacted with last.
//       if (correspondingOption) {
//         this._keyManager.updateActiveItem(correspondingOption);
//       } else if (!this.panelOpen) {
//         // Otherwise reset the highlighted option. Note that we only want to do this while
//         // closed, because doing it while open can shift the user's focus unnecessarily.
//         this._keyManager.updateActiveItem(-1);
//       }
//     }

//     this._neoChangeDetectorRef.markForCheck();
//   }

//   private _neoSelectValue(value: any): any | undefined {
//     console.log('_neoSelectValue=>', value )
//     const correspondingOption = this.options.find((option: any) => {
//       try {
//         // Treat null as a special reset value.
//         return option.value != null && this._neoCompareWith(option.value,  value);
//       } catch (error) {
//         if (typeof this.ngDevMode === 'undefined' || this.ngDevMode) {
//           // Notify developers of errors in their comparator.
//           console.warn(error);
//         }
//         return false;
//       }
//     });
// console.log(correspondingOption)
//     if (correspondingOption) {
//       this._selectionModel.select(correspondingOption);
//     }

//     return correspondingOption;
//   }

//   private _neoSortValues() {
//     if (this.multiple) {
//       const options = this.options.toArray();

//       this._selectionModel.sort((a, b) => {
//         return this.sortComparator ? this.sortComparator(a, b, options) :
//                                      options.indexOf(a) - options.indexOf(b);
//       });
//       this.stateChanges.next();
//     }
//   }

//   get compareWith() { return this._neoCompareWith; }
//   set compareWith(fn: (o1: any, o2: any) => boolean) {
//     if (typeof fn !== 'function' && (typeof this.ngDevMode === 'undefined' || this.ngDevMode)) {
//      // throw getMatSelectNonFunctionValueError();
//     }
//     this._neoCompareWith = fn;
//     if (this._selectionModel) {
//       // A different comparator means the selection could change.
//       this._neoInitializeSelection();
//     }
  }

  // private _neoInitializeSelection(): void {
  //   // Defer setting the value in order to avoid the "Expression
  //   // has changed after it was checked" errors from Angular.
  //   Promise.resolve().then(() => {
  //     this._neoSetSelectionByValue(this.ngControl ? this.ngControl.value : this._neoValue);
  //     this.stateChanges.next();
  //   });
  // }


  //  _neoHandleOpenKeydown(event: KeyboardEvent): void {
  //   const manager = this._keyManager;
  //   const keyCode = event.keyCode;
  //   const isArrowKey = false
  //   const isTyping = manager.isTyping();

  //   if (isArrowKey && event.altKey) {
  //     // Close the select on ALT + arrow key to match the native <select>
  //     event.preventDefault();
  //     this.close();
  //     // Don't do anything in this case if the user is typing,
  //     // because the typing sequence can include the space key.
  //   } else if (!isTyping  && manager.activeItem
  //     // &&
  //    // !hasModifierKey(event)
  //     ) 
  //     {
  //     event.preventDefault();
  //     manager.activeItem._selectViaInteraction();
  //   } else if (!isTyping && this._neoMultiple && event.ctrlKey) {
  //     event.preventDefault();
  //     const hasDeselectedOptions = this.options.some(opt => !opt.disabled && !opt.selected);

  //     this.options.forEach(option => {
  //       if (!option.disabled) {
  //         hasDeselectedOptions ? option.select() : option.deselect();
  //       }
  //     });
  //   } else {
  //     const previouslyFocusedIndex = manager.activeItemIndex;

  //     manager.onKeydown(event);

  //     if (this._neoMultiple && isArrowKey && event.shiftKey && manager.activeItem &&
  //         manager.activeItemIndex !== previouslyFocusedIndex) {
  //       manager.activeItem._selectViaInteraction();
  //     }
  //   }
  // }
//}
