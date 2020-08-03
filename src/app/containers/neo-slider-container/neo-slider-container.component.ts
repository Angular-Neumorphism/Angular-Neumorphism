import { Component, OnInit } from '@angular/core';
import { DescriptionItem } from '../models/index';
import {
 NEO_SLIDER_API,
 NEO_SLIDER_STYLE_API
} from '../api-data/index';

@Component({
  selector: 'app-neo-slider-container',
  templateUrl: './neo-slider-container.component.html',
  styleUrls: ['./neo-slider-container.component.scss']
})
export class NeoSliderContainerComponent implements OnInit {
  public sliderApi: DescriptionItem[] = NEO_SLIDER_API;
  public sliderStyleApi: DescriptionItem[] = NEO_SLIDER_STYLE_API;
  public currentSelectedIndex = 1.1;
  public changedIndexValue = null;
  public currentIndexValue = 0;

  constructor() {
  }

  ngOnInit(): void {
  }

  snippetShowingHandler(e) {
    if (e) {
      this.currentSelectedIndex = this.changedIndexValue;
    }
  }

  changeHandler(e) {
    this.changedIndexValue = e;
  }

  indexChangeHandler(index: number) {
    this.currentIndexValue = index;
  }

}
