import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss'],
})
export class MenuPageComponent implements OnInit {
  constructor() {}

  public menuShow = false;

  ngOnInit(): void {}

  menuClickHandler(event) {
    event.preventDefault();
    setTimeout(() => {
      this.menuShow = !this.menuShow;
    }, 200);
  }
}
