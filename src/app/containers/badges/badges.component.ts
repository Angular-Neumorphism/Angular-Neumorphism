import { Component, OnInit } from '@angular/core';
import { DescriptionItem } from '../models/index';
import { BADGE_API } from '../api-data/index';

@Component({
  selector: 'app-badges',
  templateUrl: './badges.component.html',
  styleUrls: ['./badges.component.scss'],
})
export class BadgesComponent implements OnInit {
  public commonApi: DescriptionItem[] = BADGE_API;
  isDisabled = true;
  public currentSelectedIndex = 1.1;
  public changedIndexValue = null;
  public currentIndexValue = 0;
  constructor() {}

  ngOnInit(): void {}

  disabledHandler() {
    this.isDisabled = !this.isDisabled;
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
