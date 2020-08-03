import { NeoColors } from '../neo-colors.service';
import {
  Component,
  ElementRef,
  NgZone,
  ViewEncapsulation,
  OnDestroy,
  ChangeDetectorRef,
  Optional,
  Attribute,
  Inject,
  OnInit,
  Input,
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
    '[class.neo-slider-hide-last-tick]':
      'disabled || _isMinValue && _thumbGap && _invertAxis',
    '[class.neo-slider-axis-inverted]': '_invertAxis',
    '[class.neo-slider-horizontal]': '!vertical',
    '[class.neo-slider-vertical]': 'vertical',
  },
  inputs: [
    'disabled',
    'invert',
    'max',
    'min',
    'step',
    'value',
    'displayWith',
    'vertical',
    'neoConfig',
  ],
})
export class NeoSlider extends MatSlider implements OnDestroy, OnInit {
  public thumbStyle: Partial<CSSStyleDeclaration>;
  private trackBackgroundStyle: Partial<CSSStyleDeclaration>;
  private parentBackgroundColor: string;

  @Input() neoConfig = {
    backgroundColor: null,
    relatedToBackground: false,
  };
  constructor(
    private neoColors: NeoColors,
    public _neoElementRef: ElementRef,
    _focusMonitor: FocusMonitor,
    _changeDetectorRef: ChangeDetectorRef,
    @Optional() _dir: Directionality,
    @Attribute('tabindex') tabIndex: string,
    _ngZone: NgZone,
    @Inject(DOCUMENT) _document: any
  ) {
    super(
      _neoElementRef,
      _focusMonitor,
      _changeDetectorRef,
      _dir,
      tabIndex,
      undefined,
      _ngZone,
      _document
    );
  }

  ngOnInit() {
    super.ngOnInit();
    this.applyNeoTheme();
  }

  private applyNeoTheme() {
    if (this.neoConfig.relatedToBackground && !this.neoConfig.backgroundColor) {
      this.parentBackgroundColor = getComputedStyle(
        this._neoElementRef.nativeElement.parentElement
      ).backgroundColor;
      this.thumbStyle = {
        backgroundColor: this.parentBackgroundColor,
        boxShadow: `-2px -2px 5px ${this.neoColors.lighten(
          this.parentBackgroundColor,
          10
        )}, 2px 2px 5px  rgba(34, 34, 34, 0.4)`,
      };
      this.trackBackgroundStyle = {
        backgroundColor: this.parentBackgroundColor,
        boxShadow: `inset 1px 1px 1px ${this.neoColors.darken(
          this.parentBackgroundColor,
          25
        )}, inset -1px -1px 1px ${this.neoColors.lighten(
          this.parentBackgroundColor,
          5
        )}`,
      };
    }

    if (this.neoConfig.backgroundColor) {
      this.trackBackgroundStyle = {
        backgroundColor: this.neoConfig.backgroundColor,
        boxShadow: `inset 1px 1px 1px ${this.neoColors.darken(
          this.neoConfig.backgroundColor,
          15
        )}, inset -1px -1px 1px ${this.neoColors.lighten(
          this.neoConfig.backgroundColor,
          15
        )}`,
      };
    }
  }

  public get trackBackgroundStyleMerged() {
    return {
      ...this._trackBackgroundStyles,
      ...this.trackBackgroundStyle,
    };
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}

export interface NeoStyleConfig {
  color: string;
  backgroundColor: string;
  relatedToBackground: boolean;
}
