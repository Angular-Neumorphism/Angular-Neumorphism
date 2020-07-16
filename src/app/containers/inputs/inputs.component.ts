import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DescriptionItem } from '../models/index';
import { INPUT_COMMON_API, INPUT_STYLE_API, TEXTAREA_COMMON_API } from '../api-data/index';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss'],
})
export class InputsComponent {
  public inputCommonApi: DescriptionItem[] = INPUT_COMMON_API;
  public inputStyleApi: DescriptionItem[] = INPUT_STYLE_API;
  public textareaCommonApi: DescriptionItem[] = TEXTAREA_COMMON_API;
  public textInput = '';

  exampleForm = new FormGroup({
    requiredInput: new FormControl('', [Validators.email]),
    disabledInput: new FormControl({value: 'Value from formcontrol', disabled: true}),
    textInput: new FormControl('')
  });

  constructor() {}


}
