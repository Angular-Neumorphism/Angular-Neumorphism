import {
  Component,
  ElementRef,
  NgZone,
  ViewEncapsulation,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef,
  Optional,
  Attribute,
  Inject,
} from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { DOCUMENT } from '@angular/common';
import { MatSlider } from '@angular/material/slider';

@Component({
  selector: 'neo-slider',
  templateUrl: './neo-slider.html',
  styleUrls: ['./neo-slider.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'neo-slider',
    '[class.neo-slider-min-value]': '_isMinValue',
    '[class.neo-slider-disabled]': 'disabled',
    '[class.neo-slider-sliding]': '_isSliding',
    '[class.neo-slider-has-ticks]': 'tickInterval',
    '[class.neo-slider-hide-last-tick]': 'disabled || _isMinValue && _thumbGap && _invertAxis',
    '[class.neo-slider-axis-inverted]': '_invertAxis',
    '[class.neo-slider-horizontal]': '!vertical',
    '[class.neo-slider-vertical]': 'vertical',

  },
  inputs: ['disabled', 'invert', 'max', 'min', 'step', 'value', 'displayWith', 'vertical']
})
export class NeoSlider extends MatSlider implements OnDestroy {
  constructor(
    public _neoElementRef: ElementRef,
    _focusMonitor: FocusMonitor,
    _changeDetectorRef: ChangeDetectorRef,
    @Optional() _dir: Directionality,
    @Attribute('tabindex') tabIndex: string,
    _ngZone: NgZone,
    @Inject(DOCUMENT) _document: any
  ) {
    super(_neoElementRef, _focusMonitor, _changeDetectorRef, _dir, tabIndex, undefined, _ngZone, _document);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
