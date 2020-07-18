import { MatSnackBarModule } from '@angular/material/snack-bar';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { NeoSimpleSnackBar } from './neo-snack-bar/simple-neo-snack-bar';
import { NeoSnackBarContainer } from './neo-snack-bar/neo-snack-bar-container';

@NgModule({
  declarations: [NeoSimpleSnackBar, NeoSnackBarContainer],
  imports: [
    CommonModule,
    MatSnackBarModule,
    OverlayModule,
    PortalModule,
    MatCommonModule
  ],
  exports: [MatCommonModule, NeoSnackBarContainer],
  entryComponents: [NeoSnackBarContainer, NeoSimpleSnackBar],
})
export class NeoSnackBarModule {}
