/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Directive} from '@angular/core';
import {CdkPortal} from '@angular/cdk/portal';

/** Used to flag tab labels for use with the portal directive */
@Directive({
  selector: '[neo-tab-label], [neoTabLabel]',
})
export class NeoTabLabel extends CdkPortal {
}