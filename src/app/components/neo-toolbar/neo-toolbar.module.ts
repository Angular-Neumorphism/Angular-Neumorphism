import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NeoToolbar, NeoToolbarRow } from './neo-toolbar/neo-toolbar.component';



@NgModule({
  declarations: [NeoToolbar, NeoToolbarRow],
  imports: [
    CommonModule,
    MatToolbarModule
  ],
  exports:[NeoToolbar, NeoToolbarRow]
})
export class NeoToolbarModule { }
