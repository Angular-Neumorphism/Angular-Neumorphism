import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NeoCheckbox } from './neo-checkbox/neo-checkbox.component';



@NgModule({
  declarations: [NeoCheckbox],
  imports: [
    CommonModule,
    MatCheckboxModule
  ], exports: [NeoCheckbox]
})
export class NeoCheckboxModule { }
