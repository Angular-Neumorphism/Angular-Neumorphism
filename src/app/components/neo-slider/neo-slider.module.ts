import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NeoSlider } from './neo-slider/neo-slider';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [NeoSlider],
  exports: [NeoSlider]
})
export class NeoSliderModule  { }
