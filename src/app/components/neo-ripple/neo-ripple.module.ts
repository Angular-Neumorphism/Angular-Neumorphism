import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NeoRipple } from './neo-ripple/neo-ripple.directive';
export { RIPPLE_TYPE, RIPPLE_TYPES } from './neo-ripple/neo-ripple.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [NeoRipple],
  exports: [NeoRipple],
})
export class NeoRippleModule {}
