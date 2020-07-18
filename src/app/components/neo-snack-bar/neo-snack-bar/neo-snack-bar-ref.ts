import { OverlayRef } from '@angular/cdk/overlay';
import { _NeoSnackBarContainer } from './neo-snack-bar-container';
import { MatSnackBarRef } from '@angular/material/snack-bar';

export class NeoSnackBarRef<T> extends MatSnackBarRef<T> {
  containerInstance: any;
  constructor(
    containerInstance: any,
    private _neoOverlayRef: OverlayRef
  ) {
    super(containerInstance, _neoOverlayRef);
  }
}
