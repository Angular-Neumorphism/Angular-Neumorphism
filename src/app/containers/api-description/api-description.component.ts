import { Component, OnInit, Input } from '@angular/core';
import { DescriptionItem } from '../models/index';

@Component({
  selector: 'app-api-description',
  templateUrl: './api-description.component.html',
  styleUrls: ['./api-description.component.scss']
})
export class ApiDescriptionComponent implements OnInit {

  @Input()apiDescriprionData: DescriptionItem[];

  constructor() { }

  ngOnInit(): void {
  }

}
