import {Directive, Input} from '@angular/core';

let nextUniqueId = 0;

/** Single error message to be shown underneath the form field. */
@Directive({
  selector: 'neo-error',
  host: {
    class: 'neo-error',
    role: 'alert',
    '[attr.id]': 'id',
  }
})
export class NeoError {
  @Input() id = `mat-error-${nextUniqueId++}`;
}