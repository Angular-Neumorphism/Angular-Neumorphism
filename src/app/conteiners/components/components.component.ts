import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss']
})
export class ComponentsComponent implements OnInit {

  public opened = true;
  constructor(private router: Router) { }

  @HostListener('window:resize', ['$event'])
onResize(event) {
  if(window.innerWidth < 860) {
    this.opened = false;
  } else {
    this.opened = true;
  }
}

  ngOnInit(): void {
    if(window.innerWidth < 860) {
      this.opened = false;
    }

    this.router.events.subscribe(val => {
      if(val && window.innerWidth < 860){
        window.scroll(0,0);
        this.opened = false;
      }
    });
  }

  menuToggle(event) {
    event.preventDefault();
    setTimeout(() => {
      this.opened = !this.opened;
    }, 150);
  }
}
