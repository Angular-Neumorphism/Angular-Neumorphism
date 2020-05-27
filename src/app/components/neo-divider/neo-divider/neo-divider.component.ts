import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'neo-divider',
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    role: 'separator',
    '[attr.aria-orientation]': 'vertical ? "vertical" : "horizontal"',
    '[class.neo-divider-vertical]': 'vertical',
    '[class.neo-divider-horizontal]': '!vertical',
    '[class.mat-divider-inset]': 'inset',
    class: 'neo-divider',
  },
  template: '',
  styleUrls: ['./neo-divider.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NeoDividerComponent extends MatDivider {
  constructor() {
    super();
  }

}
