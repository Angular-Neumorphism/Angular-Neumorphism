import { Directionality } from '@angular/cdk/bidi';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  Inject,
  InjectionToken,
  Input,
  NgZone,
  Optional,
  QueryList,
  ViewChild,
  ViewEncapsulation,
  OnDestroy,
} from '@angular/core';
import { LabelOptions, MAT_LABEL_GLOBAL_OPTIONS } from '@angular/material/core';
import { Subject } from 'rxjs';
import { startWith, take, takeUntil } from 'rxjs/operators';
import { MatFormField } from '@angular/material/form-field';
import { MatFormFieldControl } from '@angular/material/form-field';
import {
  getNeoFormFieldMissingControlError,
  getNeoFormFieldPlaceholderConflictError,
} from './form-fields-errors';
import { NeoLabel } from './label';
import { NeoError } from './error';
import { NeoPlaceholder } from './placeholder';
import { Platform } from '@angular/cdk/platform';
import { NgControl } from '@angular/forms';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';

/**
 * Injection token that can be used to inject an instances of `MatFormField`. It serves
 * as alternative token to the actual `MatFormField` class which would cause unnecessary
 * retention of the `MatFormField` class and its component metadata.
 */
export const MAT_FORM_FIELD = new InjectionToken<NeoFormField>('NeoFormField');

export interface NeoFormFieldDefaultOptions {
  hideRequiredMarker?: boolean;
}

/**
 * Injection token that can be used to configure the
 * default options for all form field within an app.
 */
export const NEO_FORM_FIELD_DEFAULT_OPTIONS = new InjectionToken<
  NeoFormFieldDefaultOptions
>('NEO_FORM_FIELD_DEFAULT_OPTIONS');

/** Container for form controls that applies Material Design styling and behavior. */

@Component({
  selector: 'neo-form-field',
  exportAs: 'neoFormField',
  templateUrl: './neo-form-field.component.html',
  // NeoInput is a directive and can't have styles, so we need to include its styles here
  // in form-field-input.css. The MatInput styles are fairly minimal so it shouldn't be a
  // big deal for people who aren't using MatInput.
  styleUrls: ['neo-form-field.component.scss', 'neo-form-field-input.scss'],
  host: {
    class: 'neo-form-field',
    '[class.neo-form-field-invalid]': '_control.errorState',
    '[class.neo-form-field-disabled]': '_control.disabled',
    '[class.neo-focused-tab]': '_control.focused',
    '[class.neo-accent]': 'color == "accent"',
    '[class.neo-warn]': 'color == "warn"',
    '[class.ng-untouched]': '_shouldForward("untouched")',
    '[class.ng-touched]': '_shouldForward("touched")',
    '[class.ng-pristine]': '_shouldForward("pristine")',
    '[class.ng-dirty]': '_shouldForward("dirty")',
    '[class.ng-valid]': '_shouldForward("valid")',
    '[class.ng-invalid]': '_shouldForward("invalid")',
    '[class.ng-pending]': '_shouldForward("pending")',
    '[class._mat-animation-noopable]': '!_animationsEnabled',
  },
  inputs: ['color'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: MAT_FORM_FIELD, useExisting: NeoFormField }],
})
export class NeoFormField extends MatFormField
  implements AfterContentInit, AfterContentChecked, AfterViewInit, OnDestroy {
  private _neoDestroyed = new Subject<void>();

  /** Whether the required marker should be hidden. */
  @Input()
  get hideRequiredMarker(): boolean {
    return this._neoHideRequiredMarker;
  }
  set hideRequiredMarker(value: boolean) {
    this._neoHideRequiredMarker = coerceBooleanProperty(value);
  }
  private _neoHideRequiredMarker: boolean;

  @ViewChild('connectionContainer', { static: true })
  _connectionContainerRef: ElementRef;
  @ViewChild('inputContainer') _inputContainerRef: ElementRef;

  @ContentChild(MatFormFieldControl) _controlNonStatic: MatFormFieldControl<
    any
  >;
  @ContentChild(MatFormFieldControl, { static: true })
  _controlStatic: MatFormFieldControl<any>;
  get _control() {
    return (
      this._neoExplicitFormFieldControl ||
      this._controlNonStatic ||
      this._controlStatic
    );
  }
  set _control(value) {
    this._neoExplicitFormFieldControl = value;
  }
  private _neoExplicitFormFieldControl: MatFormFieldControl<any>;

  @ContentChild(NeoLabel) _neoLabelChildNonStatic: NeoLabel;
  @ContentChild(NeoLabel, { static: true }) _neoLabelChildStatic: NeoLabel;
  get _neoLabelChild() {
    return this._neoLabelChildNonStatic || this._neoLabelChildStatic;
  }

  @ContentChild(NeoPlaceholder) _placeholderChild: NeoPlaceholder;

  @ContentChildren(NeoError, { descendants: true }) _errorChildren: QueryList<
    NeoError
  >;

  constructor(
    public _elementRef: ElementRef,
    private _neoChangeDetectorRef: ChangeDetectorRef,
    @Optional() @Inject(MAT_LABEL_GLOBAL_OPTIONS) labelOptions: LabelOptions,
    @Optional() private _neoDir: Directionality,
    @Optional()
    @Inject(NEO_FORM_FIELD_DEFAULT_OPTIONS)
    private _neoDefaults: NeoFormFieldDefaultOptions,
    private _platformRef: Platform,
    private _neoNgZone: NgZone,
    @Optional() @Inject(ANIMATION_MODULE_TYPE) _animationMode: string
  ) {
    super(
      _elementRef,
      _neoChangeDetectorRef,
      labelOptions,
      _neoDir,
      _neoDefaults,
      _platformRef,
      _neoNgZone,
      _animationMode
    );

    // Set the default through here so we invoke the setter on the first run.
    this._neoHideRequiredMarker =
      this._neoDefaults && this._neoDefaults.hideRequiredMarker != null
        ? _neoDefaults.hideRequiredMarker
        : false;
  }

  ngAfterContentInit() {
    this._validateControlChild();

    const control = this._control;

    if (control.controlType) {
      this._elementRef.nativeElement.classList.add(
        `neo-form-field-type-${control.controlType}`
      );
    }

    // Subscribe to changes in the child control state in order to update the form field UI.
    control.stateChanges.pipe(startWith(null)).subscribe(() => {
      this._neoValidatePlaceholders();
      this._neoChangeDetectorRef.markForCheck();
    });

    // Run change detection if the value changes.
    if (control.ngControl && control.ngControl.valueChanges) {
      control.ngControl.valueChanges
        .pipe(takeUntil(this._neoDestroyed))
        .subscribe(() => this._neoChangeDetectorRef.markForCheck());
    }

    // Update the aria-described by when the number of errors changes.
    this._errorChildren.changes.pipe(startWith(null)).subscribe(() => {
      this._neoChangeDetectorRef.markForCheck();
    });

    if (this._neoDir) {
      this._neoDir.change.pipe(takeUntil(this._neoDestroyed)).subscribe(() => {
        if (typeof requestAnimationFrame === 'function') {
          this._neoNgZone.runOutsideAngular(() => {
            requestAnimationFrame(() => this.updateOutlineGap());
          });
        } else {
          this.updateOutlineGap();
        }
      });
    }
  }

  ngAfterContentChecked() {
    this._validateControlChild();
  }

  ngAfterViewInit() {
    this._neoChangeDetectorRef.detectChanges();
  }

  ngOnDestroy() {
    this._neoDestroyed.next();
    this._neoDestroyed.complete();
  }

  _hasPlaceholder() {
    return !!(
      (this._control && this._control.placeholder) ||
      this._placeholderChild
    );
  }

  _hasLabel() {
    return !!this._neoLabelChild;
  }

  /**
   * Ensure that there is only one placeholder (either `placeholder` attribute on the child control
   * or child element with the `mat-placeholder` directive).
   */
  private _neoValidatePlaceholders() {
    if (this._control.placeholder && this._placeholderChild) {
      throw getNeoFormFieldPlaceholderConflictError();
    }
  }

  /**
   * Sets the list of element IDs that describe the child control. This allows the control to update
   * its `aria-describedby` attribute accordingly.
   */

  /** Throws an error if the form field's control is missing. */
  protected _validateControlChild() {
    if (!this._control) {
      throw getNeoFormFieldMissingControlError();
    }
  }
}
