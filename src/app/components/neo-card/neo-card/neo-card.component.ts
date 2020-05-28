import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Directive,
  Input,
  Optional,
  Inject,
} from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';

@Directive({
  selector: 'neo-card-content, [neo-card-content], [neoCardContent]',
  host: { class: 'neo-card-content' },
})
export class NeoCardContent {}

@Directive({
  selector: `neo-card-title, [neo-card-title], [neoCardTitle]`,
  host: {
    class: 'neo-card-title',
  },
})
export class NeoCardTitle {}

@Directive({
  selector: 'neo-card-actions',
  exportAs: 'neoCardActions',
  host: {
    class: 'neo-card-actions',
    '[class.neo-card-actions-align-end]': 'align === "end"',
  },
})
export class NeoCardActions  {
  @Input() align: 'start' | 'end' = 'start';
}

@Directive({
  selector: 'neo-card-footer',
  host: { class: 'neo-card-footer' },
})
export class NeoCardFooter {}

@Directive({
  selector: '[neo-card-image], [neoCardImage]',
  host: {class: 'neo-card-image'}
})
export class MatCardImage {}

@Component({
  selector: 'neo-card',
  exportAs: 'neoCard',
  templateUrl: './neo-card.component.html',
  styleUrls: ['./neo-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'neo-card mat-focus-indicator',
    '[class._mat-animation-noopable]': '_animationMode === "NoopAnimations"',
  },
})
export class NeoCard  {
  constructor(
    @Optional() @Inject(ANIMATION_MODULE_TYPE) public animationMode?: string
  ) {}
}

@Component({
  selector: 'neo-card-header',
  templateUrl: 'card-header.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'neo-card-header' },
})
export class NeoCardHeader {}

@Component({
  selector: 'neo-card-title-group',
  templateUrl: 'card-title-group.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'neo-card-title-group' },
})
export class NeoCardTitleGroup {}
