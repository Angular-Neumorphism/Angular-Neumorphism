import { Component, OnInit } from '@angular/core';
import { DescriptionItem } from '../models/index';
import { CHECKBOX_API, CHECKBOX_STYLE_API } from '../api-data/index';

@Component({
  selector: 'app-checkboxes',
  templateUrl: './checkboxes.component.html',
  styleUrls: ['./checkboxes.component.scss'],
})
export class CheckboxesComponent implements OnInit {
  public commonApi: DescriptionItem[] = CHECKBOX_API;
  public styleApi: DescriptionItem[] = CHECKBOX_STYLE_API;

  constructor() {}

  ngOnInit(): void {}
}
