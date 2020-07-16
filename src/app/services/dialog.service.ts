import { Injectable } from '@angular/core';
import { NeoDialog } from '@neomorphism/ng-neomorphism/neo-dialog';

import { Observable } from 'rxjs';

import { DialogPageComponent } from '../containers/dialog/dialog-page/dialog-page.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: NeoDialog) {}

  public openDialog(): Observable<any> {
    const dialogRef = this.dialog.open(DialogPageComponent);
    return dialogRef.afterClosed();
  }

  openConfiguratedDialog(): Observable<any> {
    const dialogRef = this.dialog.open(DialogPageComponent, {
      width: '250px',
      data: { configurable: true, name: undefined },
    });

    return dialogRef.afterClosed();
  }
}
