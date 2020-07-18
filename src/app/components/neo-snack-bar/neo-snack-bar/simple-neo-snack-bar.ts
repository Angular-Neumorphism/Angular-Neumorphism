/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  ViewEncapsulation,
} from '@angular/core';
import { NEO_SNACK_BAR_DATA } from './neo-snack-bar-config';
import { NeoSnackBarRef } from './neo-snack-bar-ref';
import { SimpleSnackBar } from '@angular/material/snack-bar';

/**
 * Interface for a simple snack bar component that has a message and a single action.
 */
export interface TextOnlySnackBar {
  data: { message: string; action: string };
  snackBarRef: NeoSnackBarRef<TextOnlySnackBar>;
  action: () => void;
  hasAction: boolean;
}

/**
 * A component used to open as the default snack bar, matching material spec.
 * This should only be used internally by the snack bar service.
 */
@Component({
  selector: 'simple-neo-snack-bar',
  templateUrl: 'simple-neo-snack-bar.html',
  styleUrls: ['simple-neo-snack-bar.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'neo-simple-snackbar',
  },
})
export class NeoSimpleSnackBar extends SimpleSnackBar
  implements TextOnlySnackBar {
  /** Data that was injected into the snack bar. */
  data: { message: string; action: string };

  constructor(
    public snackBarRef: NeoSnackBarRef<NeoSimpleSnackBar>,
    @Inject(NEO_SNACK_BAR_DATA) data: any
  ) {
    super(snackBarRef, data);
  }

}
