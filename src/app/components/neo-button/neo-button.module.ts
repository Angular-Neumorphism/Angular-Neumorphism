import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { NeoButtonComponent } from './neo-button/neo-button.component';

@NgModule({
  declarations: [NeoButtonComponent],
  imports: [CommonModule, MatButtonModule],
  exports: [NeoButtonComponent],
})
export class NeoButtonModule {}
