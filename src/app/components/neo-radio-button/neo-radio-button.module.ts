import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import {
  NeoRadioButton,
  NeoRadioGroup,
} from './neo-radio-button/neo-radio-button.component';

@NgModule({
  declarations: [NeoRadioButton, NeoRadioGroup],
  imports: [CommonModule, MatRadioModule],
  exports: [NeoRadioButton, NeoRadioGroup],
})
export class NeoRadioButtonModule {}
