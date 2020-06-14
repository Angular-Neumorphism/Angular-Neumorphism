import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NeoInput } from './neo-input/neo-input.component';



@NgModule({
  declarations: [NeoInput],
  imports: [
    CommonModule
  ],
  exports:[NeoInput]
})
export class NeoInputModule { }
