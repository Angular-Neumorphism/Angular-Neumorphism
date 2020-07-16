import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { NeoDividerModule } from '../neo-divider/neo-divider.module';
import { NeoTab } from './neo-tabs/neo-tabs.component';
import { NeoTabGroup } from './neo-tabs/neo-tabs.group';
import { NeoTabBody, NeoTabBodyPortal } from './neo-tabs/neo-tab-body';
import { NeoTabHeader } from './neo-tabs/neo-tab-header';
import { NeoTabLabelWrapper } from './neo-tabs/neo-tab-label-wrapper';
import { NeoTabContent } from './neo-tabs/neo-tab-content';
import { NeoTabLabel } from './neo-tabs/neo-tab-label';
import { NeoFocusPosition } from './neo-tabs/neo-tab-focus';
import { PortalModule } from '@angular/cdk/portal';

@NgModule({
  declarations: [
    NeoTab,
    NeoTabGroup,
    NeoTabBody,
    NeoTabHeader,
    NeoTabLabelWrapper,
    NeoTabBodyPortal,
    NeoTabContent,
    NeoTabLabel,
    NeoFocusPosition,
  ],
  imports: [CommonModule, MatTabsModule, NeoDividerModule, PortalModule],
  exports: [
    NeoTab,
    NeoTabGroup,
    NeoTabBody,
    NeoTabHeader,
    NeoTabLabelWrapper,
    NeoTabContent,
    NeoTabLabel,
    NeoFocusPosition,
  ],
})
export class NeoTabsModule {}
