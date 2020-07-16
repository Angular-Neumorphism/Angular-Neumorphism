/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
  Directive,
  Input,
  OnChanges,
  OnInit,
  Optional,
  SimpleChanges,
  ElementRef,
} from '@angular/core';
import { NeoDialog } from './neo-dialog.component';
import { NeoDialogRef, _closeDialogVia } from './neo-dialog-ref';
import {
  MatDialogRef,
  MatDialogClose,
  MatDialogTitle,
  MatDialogActions,
  MatDialogContent
} from '@angular/material/dialog';

/** Counter used to generate unique IDs for dialog elements. */
let dialogElementUid = 0;

/**
 * Button that will close the current dialog.
 */
@Directive({
  selector: '[neo-dialog-close], [neoDialogClose]',
  exportAs: 'neoDialogClose',
  host: {
    '(click)': '_onButtonClick($event)',
    '[attr.aria-label]': 'ariaLabel || null',
    '[attr.type]': 'type',
  },
})
export class NeoDialogClose extends MatDialogClose
  implements OnInit, OnChanges {
  /** Screenreader label for the button. */
  @Input('aria-label') ariaLabel: string;

  /** Default to "button" to prevents accidental form submits. */
  @Input() type: 'submit' | 'button' | 'reset' = 'button';

  /** Dialog close input. */
  @Input('neo-dialog-close') dialogResult: any;

  @Input('neoDialogClose') _neoDialogClose: any;

  constructor(
    @Optional() public dialogRef: NeoDialogRef<any>,
    private _neoElementRef: ElementRef<HTMLElement>,
    private _neoDialog: NeoDialog
  ) {
    super(dialogRef, _neoElementRef, _neoDialog);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnChanges(changes: SimpleChanges) {
    const proxiedChange =
      changes['_neoDialogClose'] || changes['_neoDialogCloseResult'];

    if (proxiedChange) {
      this.dialogResult = proxiedChange.currentValue;
    }
  }

  _onButtonClick(event: MouseEvent) {
    // Determinate the focus origin using the click event, because using the FocusMonitor will
    // result in incorrect origins. Most of the time, close buttons will be auto focused in the
    // dialog, and therefore clicking the button won't result in a focus change. This means that
    // the FocusMonitor won't detect any origin change, and will always output `program`.
    _closeDialogVia(
      this.dialogRef,
      event.screenX === 0 && event.screenY === 0 ? 'keyboard' : 'mouse',
      this.dialogResult
    );
  }
}

/**
 * Title of a dialog element. Stays fixed to the top of the dialog when scrolling.
 */
@Directive({
  selector: '[neo-dialog-title], [neoDialogTitle]',
  exportAs: 'neoDialogTitle',
  host: {
    class: 'neo-dialog-title',
    '[id]': 'id',
  },
})
export class NeoDialogTitle extends MatDialogTitle implements OnInit {
  @Input() id: string = `neo-dialog-title-${dialogElementUid++}`;

  constructor(
    @Optional() private _neoDialogRef: NeoDialogRef<any>,
    private _neoElementRef: ElementRef<HTMLElement>,
    private _neoDialog: NeoDialog
  ) {
    super(_neoDialogRef, _neoElementRef, _neoDialog);
  }

  ngOnInit() {
    if (!this._neoDialogRef) {
      this._neoDialogRef = getClosestDialog(
        this._neoElementRef,
        this._neoDialog.openDialogs
      )!;
    }

    if (this._neoDialogRef) {
      Promise.resolve().then(() => {
        const container = this._neoDialogRef._containerInstance;

        if (container && !container._ariaLabelledBy) {
          container._ariaLabelledBy = this.id;
        }
      });
    }
  }
}

/**
 * Scrollable content container of a dialog.
 */
@Directive({
  selector: `[neo-dialog-content], neo-dialog-content, [neoDialogContent]`,
  host: { class: 'neo-dialog-content' },
})
export class NeoDialogContent extends MatDialogContent {}

/**
 * Container for the bottom action buttons in a dialog.
 * Stays fixed to the bottom when scrolling.
 */
@Directive({
  selector: `[neo-dialog-actions], neo-dialog-actions, [neoDialogActions]`,
  host: { class: 'neo-dialog-actions' },
})
export class NeoDialogActions extends MatDialogActions {}

/**
 * Finds the closest MatDialogRef to an element by looking at the DOM.
 * @param element Element relative to which to look for a dialog.
 * @param openDialogs References to the currently-open dialogs.
 */
function getClosestDialog(
  element: ElementRef<HTMLElement>,
  openDialogs: NeoDialogRef<any>[]
) {
  let parent: HTMLElement | null = element.nativeElement.parentElement;

  while (parent && !parent.classList.contains('mat-dialog-container')) {
    parent = parent.parentElement;
  }

  return parent ? openDialogs.find((dialog) => dialog.id === parent!.id) : null;
}
