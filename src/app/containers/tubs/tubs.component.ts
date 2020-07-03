import { Component, AfterViewInit } from '@angular/core';
import { TABS_API, TAB_GROUP_API, TABS_STYLE_API } from '../api-data/index';
import { DescriptionItem } from '../models/index';

@Component({
  selector: 'app-tubs',
  templateUrl: './tubs.component.html',
  styleUrls: ['./tubs.component.scss'],
})
export class TubsComponent implements AfterViewInit {
  public tabApi: DescriptionItem[] = TABS_API;
  public tabGroupApi: DescriptionItem[] = TAB_GROUP_API;
  public tabStyleApi: DescriptionItem[] = TABS_STYLE_API;
  public currentSelectedIndex = 1.1;
  public changedIndexValue = null;
  public currentIndexValue = 0;

  constructor() {}

  ngAfterViewInit(): void {}

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
