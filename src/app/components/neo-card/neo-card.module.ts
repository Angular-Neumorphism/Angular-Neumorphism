import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';

import {
  NeoCard,
  NeoCardActions,
  NeoCardContent,
  NeoCardFooter,
  NeoCardHeader,
  NeoCardTitle,
  NeoCardTitleGroup
} from './neo-card/neo-card.component';

@NgModule({
  declarations: [NeoCard,  NeoCardActions,
    NeoCardContent,
    NeoCardFooter,
    NeoCardHeader,
    NeoCardTitle,
    NeoCardTitleGroup],
  imports: [CommonModule, MatCardModule],
  exports: [NeoCard,  NeoCardActions,
    NeoCardContent,
    NeoCardFooter,
    NeoCardHeader,
    NeoCardTitle,
    NeoCardTitleGroup],
})
export class NeoCardModule {}
