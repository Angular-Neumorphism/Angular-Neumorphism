import { FocusMonitor } from '@angular/cdk/a11y';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  InjectionToken,
  Input,
  Optional,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';
import {  NG_VALUE_ACCESSOR } from '@angular/forms';
import * as MatRadio from '@angular/material/radio';

const nextUniqueId = 0;

export const NEO_RADIO_GROUP_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NeoRadioGroup),
  multi: true,
};

export const NEO_RADIO_GROUP = new InjectionToken<any>('NeoRadioGroup');

@Directive({
  selector: 'neo-radio-group',
  exportAs: 'neoRadioGroup',
  providers: [
    NEO_RADIO_GROUP_CONTROL_VALUE_ACCESSOR,
    { provide: NEO_RADIO_GROUP, useExisting: NeoRadioGroup },
  ],
  host: {
    role: 'radiogroup',
    class: 'neo-radio-group',
  },
})
export class NeoRadioGroup extends MatRadio.MatRadioGroup {
  @ContentChildren(forwardRef(() => NeoRadioButton), { descendants: true })
  _radios: QueryList<NeoRadioButton>;
}

@Component({
  selector: 'neo-radio-button',
  templateUrl: 'neo-radio.html',
  styleUrls: ['neo-radio.scss'],
  inputs: ['disableRipple', 'tabIndex'],
  encapsulation: ViewEncapsulation.None,
  exportAs: 'matRadioButton',
  host: {
    class: 'neo-radio-button',
    '[class.neo-radio-checked]': 'checked',
    '[class.neo-radio-disabled]': 'disabled',
    '[class._neo-animation-noopable]': '_animationMode === "NoopAnimations"',
    // Needs to be -1 so the `focus` event still fires.
    '[attr.tabindex]': '-1',
    '[attr.id]': 'id',
    '[attr.aria-label]': 'null',
    '[attr.aria-labelledby]': 'null',
    '[attr.aria-describedby]': 'null',
    // Note: under normal conditions focus shouldn't land on this element, however it may be
    // programmatically set, for example inside of a focus trap, in this case we want to forward
    // the focus to the native element.
    '(focus)': '_inputElement.nativeElement.focus()',
    '[class.neo-radio-label-before]': 'labelPosition == "before"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NeoRadioButton extends MatRadio.MatRadioButton {
   // Color of the checkmark
   @Input()
   get checkMarkColor(): string {
     return this._checkMarkColor;
   }
   set checkMarkColor(value: string) {
     this._checkMarkColor = value;
   }
   private _checkMarkColor = '#2086ed';

  constructor(
    @Optional() @Inject(NEO_RADIO_GROUP) radioGroup: NeoRadioGroup,
    elementRef: ElementRef,
    changeDetector: ChangeDetectorRef,
    focusMonitor: FocusMonitor,
    radioDispatcher: UniqueSelectionDispatcher
  ) {
    super(
      radioGroup,
      elementRef,
      changeDetector,
      focusMonitor,
      radioDispatcher,
      null,
      null
    );
  }
}
