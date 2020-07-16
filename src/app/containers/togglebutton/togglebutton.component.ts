import { Component, OnInit } from '@angular/core';
import {
  SLIDE_TOGGLE_API,
  SLIDE_TOGGLE_STYLE_API
} from '../api-data/index';
import { DescriptionItem } from '../models/index';

@Component({
  selector: 'app-togglebutton',
  templateUrl: './togglebutton.component.html',
  styleUrls: ['./togglebutton.component.scss']
})
export class TogglebuttonComponent implements OnInit {
  public slideToggleApi: DescriptionItem[] = SLIDE_TOGGLE_API;
  public slideToggleStyleApi: DescriptionItem[] = SLIDE_TOGGLE_STYLE_API;

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
