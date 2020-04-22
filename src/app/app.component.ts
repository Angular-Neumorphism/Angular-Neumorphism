import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Angular-Neumorphism';

  public opened = true;

  menuToggle(event) {
    event.preventDefault();
    const menu = document.querySelector('.main-wrapper');
    menu.classList.toggle('closed');
    setTimeout(() => {
      this.opened = !this.opened;
    }, 150);
  }
}
