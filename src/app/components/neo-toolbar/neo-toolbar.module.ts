import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NeoToolbar } from './neo-toolbar/neo-toolbar.component';



@NgModule({
  declarations: [NeoToolbar],
  imports: [
    CommonModule,
    MatToolbarModule
  ],
  exports:[NeoToolbar]
})
export class NeoToolbarModule { }
