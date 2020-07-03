import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-element-example',
  templateUrl: './element-example.component.html',
  styleUrls: ['./element-example.component.scss'],
})
export class ElementExampleComponent implements OnInit {
  public showCodeSnippet = false;
  @Output() snippetShowing: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  toggleCodeSnippet() {
    this.showCodeSnippet = !this.showCodeSnippet;
    this.snippetShowing.emit(this.showCodeSnippet);
  }
}
