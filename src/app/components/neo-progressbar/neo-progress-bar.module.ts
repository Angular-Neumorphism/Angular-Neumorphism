import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NeoProgressBar } from './neo-progressbar/neo-progress-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    NoopAnimationsModule
  ],
  declarations: [NeoProgressBar],
  exports: [NeoProgressBar]
})
export class NeoProgressBarModule  { }
