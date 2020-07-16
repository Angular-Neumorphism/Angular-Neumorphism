import { Component, Inject } from '@angular/core';

import { NeoDialogRef } from '@neomorphism/ng-neomorphism/neo-dialog';
import { NEO_DIALOG_DATA} from '@neomorphism/ng-neomorphism/neo-dialog';

@Component({
  selector: 'app-dialog-page',
  templateUrl: './dialog-page.component.html',
  styleUrls: ['./dialog-page.component.scss'],
})
export class DialogPageComponent {
  constructor(
    public dialogRef: NeoDialogRef<DialogPageComponent>,
    @Inject(NEO_DIALOG_DATA) public data: any
  ) {}

}
