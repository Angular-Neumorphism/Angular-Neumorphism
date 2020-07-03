import { Component, OnInit } from '@angular/core';
import { DescriptionItem } from '../models/index';
import { TOOLBAR_API } from '../api-data/index';

@Component({
  selector: 'app-toolbar-page',
  templateUrl: './toolbar-page.component.html',
  styleUrls: ['./toolbar-page.component.scss']
})
export class ToolbarPageComponent implements OnInit {

  public commonApi: DescriptionItem[] = TOOLBAR_API;

  constructor() { }

  ngOnInit(): void {
  }

}
