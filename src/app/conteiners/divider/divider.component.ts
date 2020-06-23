import { Component, OnInit } from '@angular/core';
import { DescriptionItem } from '../models/index';
import { DIVIDER_API } from '../api-data/index';

@Component({
  selector: 'app-divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss']
})
export class DividerComponent implements OnInit {

  public commonApi: DescriptionItem[] = DIVIDER_API;

  constructor() { }

  ngOnInit(): void {
  }

}
