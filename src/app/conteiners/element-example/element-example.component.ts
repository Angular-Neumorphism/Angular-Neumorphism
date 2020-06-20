import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-element-example',
  templateUrl: './element-example.component.html',
  styleUrls: ['./element-example.component.scss'],
})
export class ElementExampleComponent implements OnInit {
  public showCodeSnippet = false;

  constructor() {}

  ngOnInit(): void {}

  toggleCodeSnippet() {
    this.showCodeSnippet = !this.showCodeSnippet;
  }
}
