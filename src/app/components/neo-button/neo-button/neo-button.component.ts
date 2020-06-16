import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  Optional,
  Inject,
  ViewEncapsulation,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { FocusMonitor } from '@angular/cdk/a11y';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';

const BUTTON_HOST_ATTRIBUTES = ['neo-button', 'neo-icon-button'];

const BUTTON_CLASS_MAP: { [id: string]: string[] } = {
  'neo-button': ['neo-button', 'mat-flat-button'],
  'neo-icon-button': ['neo-icon-button', 'mat-icon-button'],
};

@Component({
  // tslint:disable-next-line: component-selector
  selector: `button[neo-button], button[neo-secondary-button], button[neo-icon-button], button[neo-tertiary-button]`,
  exportAs: 'neoButton',
  templateUrl: './neo-button.component.html',
  styleUrls: ['./neo-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class NeoButtonComponent extends MatButton {
  constructor(
    elementRef: ElementRef,
    focusMonitor: FocusMonitor,
    @Optional() @Inject(ANIMATION_MODULE_TYPE) animationMode: string
  ) {
    super(elementRef, focusMonitor, animationMode);

    this.disableRipple = true;

    for (const attr of BUTTON_HOST_ATTRIBUTES) {
      if (this._hasHostAttributes(attr)) {
        this.setClassList(BUTTON_CLASS_MAP[attr]);
      }
    }
  }

  protected setClassList(classes: string[]): void {
    const host = this._getHostElement() as HTMLElement;
    classes.forEach((c) => host.classList.add(c));
  }
}
