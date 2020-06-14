import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NeoFormField } from './neo-form-field/neo-form-field.component';
import { NeoLabel } from './neo-form-field/label';
import { NeoError } from './neo-form-field/error';
import { NeoPlaceholder } from './neo-form-field/placeholder';

@NgModule({
  declarations: [NeoFormField, NeoPlaceholder, NeoLabel, NeoError],
  imports: [CommonModule, MatFormFieldModule],
  exports: [NeoFormField, NeoPlaceholder, NeoLabel, NeoError],
})
export class NeoFormFieldModule {}
