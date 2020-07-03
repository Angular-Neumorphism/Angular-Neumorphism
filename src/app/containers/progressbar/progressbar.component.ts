import { Component, OnInit } from '@angular/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { DescriptionItem } from '../models/index';
import { PROGRESS_BAR_API, PROGRESS_BAR_STYLE_API } from '../api-data/index';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.scss']
})
export class ProgressbarComponent implements OnInit {

  public commonApi: DescriptionItem[] = PROGRESS_BAR_API;
  public styleApi: DescriptionItem[] = PROGRESS_BAR_STYLE_API;

  mode: ProgressBarMode = 'determinate';
  value = 50;

  constructor() { }

  onValueChange($event: any) {
    this.value = $event.target.value;
  }

  ngOnInit(): void {
  }

}
