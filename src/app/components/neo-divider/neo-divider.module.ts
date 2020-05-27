import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';

import { NeoDividerComponent } from './neo-divider/neo-divider.component';

@NgModule({
  declarations: [NeoDividerComponent],
  imports: [CommonModule, MatDividerModule],
  exports: [NeoDividerComponent],
})
export class NeoDividerModule {}
