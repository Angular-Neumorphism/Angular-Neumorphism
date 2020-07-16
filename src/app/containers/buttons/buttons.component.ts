import { Component, OnInit } from '@angular/core';
import { DescriptionItem } from '../models/index';
import { BUTTON_API } from '../api-data/index';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {

  public commonApi: DescriptionItem[] = BUTTON_API;

  constructor() { }

  ngOnInit(): void {
  }

}
