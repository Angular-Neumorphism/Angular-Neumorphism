import { Component, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss'],
})
export class InputsComponent implements AfterViewInit {
  public textInput = '';

  exampleForm = new FormGroup({
    requiredInput: new FormControl('', [Validators.email]),
    disabledInput: new FormControl({value: 'Value from formcontrol', disabled: true}),
    textInput: new FormControl(''),
  });

  constructor() {}

  ngAfterViewInit(): void {
    const tabs = document.getElementsByClassName('mat-tab-label');
    const tab: HTMLElement = tabs[0] as HTMLElement;
    tab.focus();
  }

}
