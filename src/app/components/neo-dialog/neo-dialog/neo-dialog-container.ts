/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
  Component,
  ComponentRef,
  ElementRef,
  EmbeddedViewRef,
  EventEmitter,
  Inject,
  Optional,
  ChangeDetectorRef,
  ViewChild,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AnimationEvent } from '@angular/animations';
import { neoDialogAnimations } from './neo-dialog-animation';
import {
  BasePortalOutlet,
  ComponentPortal,
  CdkPortalOutlet,
  TemplatePortal,
  DomPortal,
} from '@angular/cdk/portal';
import {
  FocusTrap,
  FocusMonitor,
  FocusOrigin,
  FocusTrapFactory,
} from '@angular/cdk/a11y';
import { NeoDialogConfig } from './neo-dialog-config';
import { MatDialogContainer } from '@angular/material/dialog';

@Component({
  selector: 'neo-dialog-container',
  templateUrl: 'neo-dialog-container.html',
  styleUrls: ['neo-dialog.scss'],
  encapsulation: ViewEncapsulation.None,
  // Using OnPush for dialogs caused some G3 sync issues. Disabled until we can track them down.
  // tslint:disable-next-line:validate-decorators
  changeDetection: ChangeDetectionStrategy.Default,
  animations: [neoDialogAnimations.dialogContainer],
  host: {
    class: 'neo-dialog-container',
    tabindex: '-1',
    'aria-modal': 'true',
    '[attr.id]': '_id',
    '[attr.role]': '_config.role',
    '[attr.aria-labelledby]': '_config.ariaLabel ? null : _ariaLabelledBy',
    '[attr.aria-label]': '_config.ariaLabel',
    '[attr.aria-describedby]': '_config.ariaDescribedBy || null',
    '[@dialogContainer]': '_state',
    '(@dialogContainer.start)': '_onAnimationStart($event)',
    '(@dialogContainer.done)': '_onAnimationDone($event)',
  },
})
export class NeoDialogContainer extends MatDialogContainer {
  _closeInteractionType: FocusOrigin | null = null;
  constructor(
    private _neoElementRef: ElementRef,
    private _neoFocusTrapFactory: FocusTrapFactory,
    private _neoChangeDetectorRef: ChangeDetectorRef,
    @Optional() @Inject(DOCUMENT) _document: any,
    /** The dialog configuration. */
    public _config: NeoDialogConfig,
    private _neoFocusMonitor?: FocusMonitor
  ) {
    super(
      _neoElementRef,
      _neoFocusTrapFactory,
      _neoChangeDetectorRef,
      _document,
      _config
    );
  }
}
