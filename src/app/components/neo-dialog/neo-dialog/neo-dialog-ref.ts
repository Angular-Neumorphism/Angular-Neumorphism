import { FocusOrigin } from '@angular/cdk/a11y';
import {  OverlayRef } from '@angular/cdk/overlay';
import { NeoDialogContainer } from './neo-dialog-container';
import { MatDialogRef } from '@angular/material/dialog';

let uniqueId = 0;



/**
 * Reference to a dialog opened via the MatDialog service.
 */
export class NeoDialogRef<T, R = any> extends MatDialogRef<T, R> {
  constructor(
    private _neoOverlayRef: OverlayRef,
    public _containerInstance: NeoDialogContainer,
    readonly id: string = `mat-dialog-${uniqueId++}`
  ) {
    super(_neoOverlayRef, _containerInstance, id);
  }

}

export function _closeDialogVia<R>(ref: any, interactionType: FocusOrigin, result?: R) {
    // Some mock dialog ref instances in tests do not have the `_containerInstance` property.
    // For those, we keep the behavior as is and do not deal with the interaction type.
    if (ref._containerInstance !== undefined) {
      ref._containerInstance._closeInteractionType = interactionType;
    }
    return ref.close(result);
  }
