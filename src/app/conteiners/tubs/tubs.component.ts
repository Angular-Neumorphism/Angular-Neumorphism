import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-tubs',
  templateUrl: './tubs.component.html',
  styleUrls: ['./tubs.component.scss']
})
export class TubsComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {
    const tabs = document.getElementsByClassName('mat-tab-label');
    const tab: HTMLElement = tabs[0] as HTMLElement;
    tab.focus();
  }

}
