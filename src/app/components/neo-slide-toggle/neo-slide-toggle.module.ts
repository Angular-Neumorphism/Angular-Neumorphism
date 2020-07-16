import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NeoSlideToggle } from './neo-slide-toggle/neo-slide-toggle.component';

@NgModule({
  declarations: [NeoSlideToggle],
  imports: [CommonModule],
  exports: [NeoSlideToggle],
})
export class NeoSlideToggleModule {}
