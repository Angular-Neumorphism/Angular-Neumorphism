import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProgressBarMode } from '@angular/material/progress-bar';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.scss']
})
export class ProgressbarComponent implements OnInit {

  mode: ProgressBarMode = 'determinate';
  value = 50;

  constructor() { }

  onValueChange($event: any) {
    this.value = $event.target.value
  }

  ngOnInit(): void {
  }

}
