import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';

import {
  NeoCard,
  NeoCardActions,
  NeoCardSubtitle,
  NeoCardSmImage,
  NeoCardMdImage,
  MatCardLgImage,
  NeoCardXlImage,
  NeoCardAvatar,
  NeoCardImage,
  NeoCardContent,
  NeoCardFooter,
  NeoCardHeader,
  NeoCardTitle,
  NeoCardTitleGroup,
} from './neo-card/neo-card.component';

@NgModule({
  declarations: [
    NeoCard,
    NeoCardActions,
    NeoCardSubtitle,
    NeoCardSmImage,
    NeoCardMdImage,
    MatCardLgImage,
    NeoCardXlImage,
    NeoCardAvatar,
    NeoCardImage,
    NeoCardContent,
    NeoCardFooter,
    NeoCardHeader,
    NeoCardTitle,
    NeoCardTitleGroup,
  ],
  imports: [CommonModule, MatCardModule],
  exports: [
    NeoCard,
    NeoCardActions,
    NeoCardSubtitle,
    NeoCardSmImage,
    NeoCardMdImage,
    MatCardLgImage,
    NeoCardXlImage,
    NeoCardAvatar,
    NeoCardImage,
    NeoCardContent,
    NeoCardFooter,
    NeoCardHeader,
    NeoCardTitle,
    NeoCardTitleGroup,
  ],
})
export class NeoCardModule {}
