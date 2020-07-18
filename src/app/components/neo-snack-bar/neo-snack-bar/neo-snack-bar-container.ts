/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { AnimationEvent } from '@angular/animations';
import {
  BasePortalOutlet,
  CdkPortalOutlet,
  ComponentPortal,
  TemplatePortal,
  DomPortal,
} from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  ElementRef,
  EmbeddedViewRef,
  NgZone,
  OnDestroy,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { neoSnackBarAnimations } from './neo-snack-bar-animation';
import { NeoSnackBarConfig } from './neo-snack-bar-config';
import { MatSnackBarContainer, MatSnackBarConfig } from '@angular/material/snack-bar';

/**
 * Internal interface for a snack bar container.
 * @docs-private
 */
// tslint:disable-next-line:class-name
export interface _NeoSnackBarContainer {
  snackBarConfig: NeoSnackBarConfig | MatSnackBarConfig;
  _onExit: Subject<any>;
  _onEnter: Subject<any>;
  enter: () => void;
  exit: () => Observable<void>;
  attachTemplatePortal: <C>(portal: TemplatePortal<C>) => EmbeddedViewRef<C>;
  attachComponentPortal: <T>(portal: ComponentPortal<T>) => ComponentRef<T>;
}

/**
 * Internal component that wraps user-provided snack bar content.
 * @docs-private
 */
@Component({
  selector: 'neo-snack-bar-container',
  templateUrl: 'neo-snack-bar-container.html',
  styleUrls: ['neo-snack-bar-container.scss'],
  // In Ivy embedded views will be change detected from their declaration place, rather than
  // where they were stamped out. This means that we can't have the snack bar container be OnPush,
  // because it might cause snack bars that were opened from a template not to be out of date.
  // tslint:disable-next-line:validate-decorators
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None,
  animations: [neoSnackBarAnimations.snackBarState],
  host: {
    '[attr.role]': '_role',
    class: 'neo-snack-bar-container',
    '[@state]': '_animationState',
    '(@state.done)': 'onAnimationEnd($event)',
  },
})
export class NeoSnackBarContainer extends MatSnackBarContainer
  implements OnDestroy, _NeoSnackBarContainer {

  constructor(
    private _neoNgZone: NgZone,
    private _neoElementRef: ElementRef<HTMLElement>,
    private _neoChangeDetectorRef: ChangeDetectorRef,
    /** The snack bar configuration. */
    public snackBarConfig: NeoSnackBarConfig
  ) {
    super(_neoNgZone, _neoElementRef, _neoChangeDetectorRef, snackBarConfig);
  }

  /** Makes sure the exit callbacks have been invoked when the element is destroyed. */
  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
