import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NeoProgressBar } from './neo-progressbar/neo-progress-bar';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NeoProgressBar],
  exports: [NeoProgressBar]
})
export class NeoProgressBarModule  { }
