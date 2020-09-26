import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NeoSelect, NeoSelectTrigger } from './neo-select/neo-select.component';
import {OverlayModule} from '@angular/cdk/overlay';
import {MatFormFieldModule} from '@angular/material/form-field';
import {CdkScrollableModule} from '@angular/cdk/scrolling';



@NgModule({
  declarations: [NeoSelect, NeoSelectTrigger],
  imports: [
    CommonModule,
    OverlayModule,
    MatFormFieldModule,
    CdkScrollableModule
  ],
  exports: [NeoSelect, NeoSelectTrigger]
})
export class NeoSelectModule { }
