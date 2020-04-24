import { Injectable } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { Observable } from 'rxjs';

import { DialogPageComponent } from '../conteiners/dialog/dialog-page/dialog-page.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  public openDialog(): Observable<any> {
    const dialogRef = this.dialog.open(DialogPageComponent, {
      panelClass: 'custom-dialog-container',
      backdropClass: 'backdropBackground',
      autoFocus: false,
      width: '600px',
      height: '400px',
    });
    return dialogRef.afterClosed();
  }
}
