import { FocusableOption, FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterViewChecked,
  Attribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  Optional,
  Output,
  ViewChild,
  ViewEncapsulation,
  AfterViewInit,
  InjectionToken,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  CanDisable,
  CanDisableRipple,
  HasTabIndex,
} from '@angular/material/core';
import {MatCheckbox} from '@angular/material/checkbox';

// Increasing integer for generating unique ids for checkbox components.
let nextUniqueId = 0;

/**
 * Provider Expression that allows mat-checkbox to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
export const MAT_CHECKBOX_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NeoCheckbox),
  multi: true,
};

export type MatCheckboxClickAction = 'noop' | 'check' | undefined;

/**
 * Injection token that can be used to specify the checkbox click behavior.
 * @deprecated Injection token will be removed, use `MAT_CHECKBOX_DEFAULT_OPTIONS` instead.
 * @breaking-change 10.0.0
 */
export const MAT_CHECKBOX_CLICK_ACTION = new InjectionToken<
  MatCheckboxClickAction
>('mat-checkbox-click-action');

/**
 * Represents the different states that require custom transitions between them.
 * @docs-private
 */
export const enum TransitionCheckState {
  /** The initial state of the component before any user interaction. */
  Init,
  /** The state representing the component when it's becoming checked. */
  Checked,
  /** The state representing the component when it's becoming unchecked. */
  Unchecked,
  /** The state representing the component when it's becoming indeterminate. */
  Indeterminate,
}

/** Change event object emitted by MatCheckbox. */
export class NeoCheckboxChange {
  /** The source MatCheckbox of the event. */
  source: NeoCheckbox;
  /** The new `checked` value of the checkbox. */
  checked: boolean;
}

/**
 * A  checkbox component. Supports all of the functionality of an HTML5 checkbox,
 * and exposes a similar API. A NeoCheckbox can be either checked, unchecked, indeterminate, or
 * disabled. Note that all additional accessibility attributes are taken care of by the component,
 * so there is no need to provide them yourself. However, if you want to omit a label and still
 * have the checkbox be accessible, you may supply an [aria-label] input.
 * See: https://material.io/design/components/selection-controls.html
 */
@Component({
  selector: 'neo-checkbox',
  templateUrl: './neo-checkbox.component.html',
  styleUrls: ['neo-checkbox.component.scss'],
  exportAs: 'neoCheckbox',
  host: {
    class: 'neo-checkbox',
    '[id]': 'id',
    '[attr.tabindex]': 'null',
    // '[class.neo-checkbox-indeterminate]': 'indeterminate',
    '[class.neo-checkbox-checked]': 'checked',
    '[class.neo-checkbox-disabled]': 'disabled',
    '[class.neo-checkbox-label-before]': 'labelPosition == "before"',
  },
  providers: [MAT_CHECKBOX_CONTROL_VALUE_ACCESSOR],
  inputs: ['tabIndex'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NeoCheckbox extends MatCheckbox
  implements
    ControlValueAccessor,
    OnDestroy,
    CanDisable,
    HasTabIndex,
    CanDisableRipple,
    FocusableOption {


  /** The 'aria-describedby' attribute is read after the element's label and field type. */
 @Input('aria-describedby') ariaDescribedby: string;

  private _neoUniqueId: string = `neo-checkbox-${++nextUniqueId}`;

  /** Returns the unique id for the visual hidden input. */
  get inputId(): string {
    return `${super.id || this._neoUniqueId}-input`;
  }

  /** Whether the checkbox is required. */
  @Input()
  get required(): boolean {
    return this._neoRequired;
  }
  set required(value: boolean) {
    this._neoRequired = coerceBooleanProperty(value);
  }
  private _neoRequired: boolean;

  //Color of the checkmark
  @Input()
  get checkMarkColor(): string {
    return this._checkMarkColor;
  }
  set checkMarkColor(value: string) {
    this._checkMarkColor = value;
  }
  private _checkMarkColor: string = '#2086ed';

  /** Event emitted when the checkbox's `checked` value changes. */
  // tslint:disable-next-line:no-output-native
  @Output() readonly change: EventEmitter<any> = new EventEmitter<
    NeoCheckboxChange
  >();

  /** Event emitted when the checkbox's `indeterminate` value changes. */
  // @Output() readonly indeterminateChange: EventEmitter<
  //   boolean
  // > = new EventEmitter<boolean>();

  /** The value attribute of the native input element */
  //@Input() value: string;

  /** The native `<input type="checkbox">` element */
  @ViewChild('input') _inputElement: ElementRef<HTMLInputElement>;

  /** Reference to the ripple instance of the checkbox. */
  // @ViewChild(MatRipple) ripple: MatRipple;

  /**
   * Called when the checkbox is blurred. Needed to properly implement ControlValueAccessor.
   * @docs-private
   */
  //_onTouched: () => any = () => {};

  private _neoCurrentAnimationClass: string = '';

  private _neoCurrentCheckState: TransitionCheckState =
    TransitionCheckState.Init;

  private _neoControlValueAccessorChangeFn: (value: any) => void = () => {};

  constructor(
    elementRef: ElementRef<HTMLElement>,
    private _neoChangeDetectorRef: ChangeDetectorRef,
    private _neoFocusMonitor: FocusMonitor,
    private _neoNgZone: NgZone,
    @Attribute('tabindex') neoTabIndex: string,
    @Optional()
    @Inject(MAT_CHECKBOX_CLICK_ACTION)
    private _neoClickAction: MatCheckboxClickAction
  ) {
    super(
      elementRef,
      _neoChangeDetectorRef,
      _neoFocusMonitor,
      _neoNgZone,
      neoTabIndex,
      _neoClickAction,
      null,
      null
    );

    // tslint:disable-next-line:radix
    //this.tabIndex = parseInt(neoTabIndex) || 0;

    this._neoFocusMonitor.monitor(elementRef, true).subscribe((focusOrigin) => {
      if (!focusOrigin) {
        // When a focused element becomes disabled, the browser *immediately* fires a blur event.
        // Angular does not expect events to be raised during change detection, so any state change
        // (such as a form control's 'ng-touched') will cause a changed-after-checked error.
        // See https://github.com/angular/angular/issues/17793. To work around this, we defer
        // telling the form control it has been touched until the next tick.
        Promise.resolve().then(() => {
          this._onTouched();
          _neoChangeDetectorRef.markForCheck();
        });
      }
    });
  }

  ngOnDestroy() {
    this._neoFocusMonitor.stopMonitoring(this._elementRef);
  }

  /**
   * Whether the checkbox is checked.
   */
  @Input()
  get checked(): boolean {
    return this._neoChecked;
  }
  set checked(value: boolean) {
    if (value != this.checked) {
      this._neoChecked = value;
      this._neoChangeDetectorRef.markForCheck();
    }
  }
  private _neoChecked: boolean = false;

  /**
   * Whether the checkbox is disabled. This fully overrides the implementation provided by
   * mixinDisabled, but the mixin is still required because mixinTabIndex requires it.
   */
  @Input()
  get disabled() {
    return this._neoDisabled;
  }
  set disabled(value: any) {
    const newValue = coerceBooleanProperty(value);

    if (newValue !== this.disabled) {
      this._neoDisabled = newValue;
      this._neoChangeDetectorRef.markForCheck();
    }
  }
  private _neoDisabled: boolean = false;

  /**
   * Whether the checkbox is indeterminate. This is also known as "mixed" mode and can be used to
   * represent a checkbox with three states, e.g. a checkbox that represents a nested list of
   * checkable items. Note that whenever checkbox is manually clicked, indeterminate is immediately
   * set to false.
   */
  // @Input()
  // get indeterminate(): boolean {
  //   return this._neoIndeterminate;
  // }
  // set indeterminate(value: boolean) {
  //   const changed = value != this._neoIndeterminate;
  //   this._neoIndeterminate = coerceBooleanProperty(value);

  //   if (changed) {
  //     if (this._neoIndeterminate) {
  //       this._neoTransitionCheckState(TransitionCheckState.Indeterminate);
  //     } else {
  //       this._neoTransitionCheckState(
  //         this.checked
  //           ? TransitionCheckState.Checked
  //           : TransitionCheckState.Unchecked
  //       );
  //     }
  //     this.indeterminateChange.emit(this._neoIndeterminate);
  //   }

  //   this._neoSyncIndeterminate(this._neoIndeterminate);
  // }
  private _neoIndeterminate: boolean = false;

  // _isRippleDisabled() {
  //   return this.disableRipple || this.disabled;
  // }

  /** Method being called whenever the label text changes. */
  // _onLabelTextChange() {
  //   // Since the event of the `cdkObserveContent` directive runs outside of the zone, the checkbox
  //   // component will be only marked for check, but no actual change detection runs automatically.
  //   // Instead of going back into the zone in order to trigger a change detection which causes
  //   // *all* components to be checked (if explicitly marked or not using OnPush), we only trigger
  //   // an explicit change detection for the checkbox view and its children.
  //   this._neoChangeDetectorRef.detectChanges();
  // }

  // Implemented as part of ControlValueAccessor.
  writeValue(value: any) {
    this.checked = !!value;
  }

  // Implemented as part of ControlValueAccessor.
  registerOnChange(fn: (value: any) => void) {
    this._neoControlValueAccessorChangeFn = fn;
  }

  // Implemented as part of ControlValueAccessor.
  registerOnTouched(fn: any) {
    this._onTouched = fn;
  }

  // Implemented as part of ControlValueAccessor.
  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  // _getAriaChecked(): 'true' | 'false' | 'mixed' {
  //   if (this.checked) {
  //     return 'true';
  //   }

  //   return this.indeterminate ? 'mixed' : 'false';
  // }

  private _neoEmitChangeEvent() {
    const event = new NeoCheckboxChange();
    event.source = this;
    event.checked = this.checked;

    this._neoControlValueAccessorChangeFn(this.checked);
    this.change.emit(event);
  }

  /** Toggles the `checked` state of the checkbox. */
  toggle(): void {
    this.checked = !this.checked;
  }

  /**
   * Event handler for checkbox input element.
   * Toggles checked state if element is not disabled.
   * Do not toggle on (change) event since IE doesn't fire change event when
   *   indeterminate checkbox is clicked.
   * @param event
   */
  _onInputClick(event: Event) {
    // We have to stop propagation for click events on the visual hidden input element.
    // By default, when a user clicks on a label element, a generated click event will be
    // dispatched on the associated input element. Since we are using a label element as our
    // root container, the click event on the `checkbox` will be executed twice.
    // The real click event will bubble up, and the generated click event also tries to bubble up.
    // This will lead to multiple click events.
    // Preventing bubbling for the second event will solve that issue.
    event.stopPropagation();

    // If resetIndeterminate is false, and the current state is indeterminate, do nothing on click
    if (!this.disabled && this._neoClickAction !== 'noop') {
      // When user manually click on the checkbox, `indeterminate` is set to false.
      if (this.indeterminate && this._neoClickAction !== 'check') {
        Promise.resolve().then(() => {
          this._neoIndeterminate = false;
          this.indeterminateChange.emit(this._neoIndeterminate);
        });
      }

      this.toggle();
      // Emit our custom change event if the native input emitted one.
      // It is important to only emit it, if the native input triggered one, because
      // we don't want to trigger a change event, when the `checked` variable changes for example.
      this._neoEmitChangeEvent();
    } else if (!this.disabled) {
      // Reset native input when clicked with noop. The native checkbox becomes checked after
      // click, reset it to be align with `checked` value of `mat-checkbox`.
      this._inputElement.nativeElement.checked = this.checked;
    //  this._inputElement.nativeElement.indeterminate = this.indeterminate;
    }
  }

  /** Focuses the checkbox. */
  focus(origin: FocusOrigin = 'keyboard', options?: FocusOptions): void {
    this._neoFocusMonitor.focusVia(this._inputElement, origin, options);
  }

}

