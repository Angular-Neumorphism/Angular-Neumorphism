import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { MatDialogModule } from '@angular/material/dialog';
import {
  NeoDialog,
  MAT_DIALOG_SCROLL_STRATEGY_PROVIDER,
} from './neo-dialog/neo-dialog.component';
import { NeoDialogContainer } from './neo-dialog/neo-dialog-container';
import { NeoDialogTitle, NeoDialogActions, NeoDialogClose, NeoDialogContent } from './neo-dialog/neo-dialog-content-directives';

@NgModule({
  declarations: [ NeoDialogContainer, NeoDialogTitle, NeoDialogActions, NeoDialogClose, NeoDialogContent],
  imports: [CommonModule, MatDialogModule, OverlayModule, PortalModule],
  providers: [NeoDialog, MAT_DIALOG_SCROLL_STRATEGY_PROVIDER],
  entryComponents: [NeoDialogContainer],
  exports: [ NeoDialogContainer, NeoDialogTitle, NeoDialogActions, NeoDialogClose, NeoDialogContent],
})
export class NeoDialogModule {}
