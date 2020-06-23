/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Directive, TemplateRef} from '@angular/core';

/** Decorates the `ng-template` tags and reads out the template from it. */
@Directive({selector: '[neoTabContent]'})
export class NeoTabContent {
  constructor(public template: TemplateRef<any>) { }
}