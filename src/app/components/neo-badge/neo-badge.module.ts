import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';
import { NeoBadge } from './neo-badge/neo-badge.component';

@NgModule({
  declarations: [NeoBadge],
  imports: [CommonModule, MatBadgeModule],
  exports: [NeoBadge],
})
export class NeoBadgeModule {}
