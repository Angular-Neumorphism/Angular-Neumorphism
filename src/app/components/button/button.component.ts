import {
  Component,
  OnInit,
  ElementRef,
  ViewEncapsulation,
} from '@angular/core';

const BUTTON_HOST_ATTRIBUTES = ['basic', 'primary', 'disabled', 'warn', 'neo-button'];
@Component({
  selector: 'button[neo-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent {
  constructor(private elementRef: ElementRef) {
    for (const attr of BUTTON_HOST_ATTRIBUTES) {
      if (this._hasHostAttributes(attr)) {
        (this._getHostElement() as HTMLElement).classList.add(attr);
      }
    }
  }

  private _getHostElement() {
    return this.elementRef.nativeElement;
  }

  private _hasHostAttributes(...attributes: string[]) {
    return attributes.some((attribute) =>
      this._getHostElement().hasAttribute(attribute)
    );
  }
}
