import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  goToUrl(): void {
    window.open(
      'https://github.com/Angular-Neumorphism/Angular-Neumorphism/',
      '_blank'
    );
  }

  goToPatrionUrl(){
    window.open(
      'https://www.patreon.com/neomorphism',
      '_blank'
    );
  }

}
