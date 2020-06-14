import { MatInput } from '@angular/material/input';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Platform } from '@angular/cdk/platform';
import { AutofillMonitor } from '@angular/cdk/text-field';
import {
  Directive,
  DoCheck,
  ElementRef,
  Inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Self
} from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import {
  CanUpdateErrorState,
  ErrorStateMatcher
} from '@angular/material/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MAT_INPUT_VALUE_ACCESSOR } from './input-value-accessor';

// Invalid input type. Using one of these will throw an MatInputUnsupportedTypeError.
const NEO_INPUT_INVALID_TYPES = [
  'button',
  'checkbox',
  'file',
  'hidden',
  'image',
  'radio',
  'range',
  'reset',
  'submit',
];

let nextUniqueId = 0;

/** Directive that allows a native input to work inside a `NeoFormField`. */
// tslint:disable-next-line:no-conflicting-lifecycle
@Directive({
  selector: `input[neoInput], textarea[neoInput], select[neoNativeControl],
      input[neoNativeControl], textarea[neoNativeControl]`,
  exportAs: 'neoInput',
  host: {
    class: 'neo-input neo-input-element neo-form-field-autofill-control',
    '[class.neo-input-server]': '_isServer',
    // Native input properties that are overwritten by Neo inputs need to be synced with
    // the native input element. Otherwise property bindings for those don't work.
    '[attr.id]': 'id',
    '[attr.placeholder]': 'placeholder',
    '[disabled]': 'disabled',
    '[required]': 'required',
    '[attr.readonly]': 'readonly && !_isNativeSelect || null',
    '[attr.aria-describedby]': '_ariaDescribedby || null',
    '[attr.aria-invalid]': 'errorState',
    '[attr.aria-required]': 'required.toString()',
  },
  providers: [{ provide: MatFormFieldControl, useExisting: NeoInput }],
})
export class NeoInput extends MatInput
  implements
    MatFormFieldControl<any>,
    OnChanges,
    OnDestroy,
    OnInit,
    DoCheck,
    CanUpdateErrorState {
  private _neoInputValueAccessor: { value: any };
 
  @Input()
  get value(): string {
    if (this._neoInputValueAccessor) {
      return this._neoInputValueAccessor.value;
    }
  }
  set value(value: string) {
    if (value !== this.value) {
      this._neoInputValueAccessor.value = value;
      this.stateChanges.next();
    }
  }

  /** Whether the element is readonly. */
  @Input()
  get readonly(): boolean {
    return this._neoReadonly;
  }
  set readonly(value: boolean) {
    this._neoReadonly = coerceBooleanProperty(value);
  }
  private _neoReadonly = false;

  constructor(
    protected _elementRef: ElementRef<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    protected _platform: Platform,
    /** @docs-private */
    @Optional() @Self() public ngControl: NgControl,
    @Optional() _parentForm: NgForm,
    @Optional() _parentFormGroup: FormGroupDirective,
    _defaultErrorStateMatcher: ErrorStateMatcher,
    @Optional()
    @Self()
    @Inject(MAT_INPUT_VALUE_ACCESSOR)
    inputValueAccessor: any,
    private _autofillMonitorNeo: AutofillMonitor,
    ngZone: NgZone
  ) {
    super(
      _elementRef,
      _platform,
      ngControl,
      _parentForm,
      _parentFormGroup,
      _defaultErrorStateMatcher,
      inputValueAccessor,
      _autofillMonitorNeo,
      ngZone
    );

    const element = this._elementRef.nativeElement;
    // If no input value accessor was explicitly specified, use the element as the input value
    // accessor.
    this._neoInputValueAccessor = inputValueAccessor || element;
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnChanges() {
    super.ngOnChanges();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  ngDoCheck() {
    super.ngDoCheck();
  }
}
