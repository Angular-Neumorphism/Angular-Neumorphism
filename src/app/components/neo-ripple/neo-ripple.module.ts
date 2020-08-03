import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NeoRipple } from './neo-ripple/neo-ripple.directive';
import { MatRippleModule, MatRipple } from '@angular/material/core';
export { RIPPLE_TYPE, RIPPLE_TYPES } from './neo-ripple/neo-ripple.directive';

@NgModule({
  imports: [CommonModule, MatRippleModule],
  declarations: [NeoRipple],
  exports: [NeoRipple, MatRipple],
})
export class NeoRippleModule {}
