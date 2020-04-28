import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'Angular-Neumorphism';

  constructor(private router: Router) {
  }

  ngAfterViewInit(){
    const scrollbox = document.querySelector('.scroll-container');
    this.router.events.subscribe((val) => {
      if (val && window.innerWidth < 860) {
        scrollbox.scroll(0, 0);
      }
    });
  }
}
