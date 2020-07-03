import { Component, OnInit } from '@angular/core';
import {
  RADIO_BUTTON_API,
  RADIO_GROUP_API,
  RADIO_STYLE_API,
} from '../api-data/index';
import { DescriptionItem } from '../models/index';

@Component({
  selector: 'app-radiobuttons',
  templateUrl: './radiobuttons.component.html',
  styleUrls: ['./radiobuttons.component.scss'],
})
export class RadiobuttonsComponent implements OnInit {
  public radioApi: DescriptionItem[] = RADIO_BUTTON_API;
  public radioGroupApi: DescriptionItem[] = RADIO_GROUP_API;
  public radioStyleApi: DescriptionItem[] = RADIO_STYLE_API;

  public currentSelectedIndex = 1.1;
  public changedIndexValue = null;
  public currentIndexValue = 0;

  favoriteSeason: string;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

  constructor() {}

  ngOnInit(): void {}

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
