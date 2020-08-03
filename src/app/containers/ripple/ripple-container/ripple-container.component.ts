import { Component, OnInit } from '@angular/core';
import {
RIPPLE_API
} from '../../api-data/index';
import { DescriptionItem } from '../../models/index';

@Component({
  selector: 'app-ripple-container',
  templateUrl: './ripple-container.component.html',
  styleUrls: ['./ripple-container.component.scss']
})
export class RippleContainerComponent implements OnInit {
  public commonApi: DescriptionItem[] = RIPPLE_API;
  public currentSelectedIndex = 1.1;
  public changedIndexValue = null;
  public currentIndexValue = 0;

  constructor() { }

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
