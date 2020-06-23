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
  selector: `neo-card-subtitle, [neo-card-subtitle], [neoCardSubtitle]`,
  host: {
    class: 'neo-card-subtitle'
  }
})
export class NeoCardSubtitle {}


/**
 * Image used in a card, needed to add the mat- CSS styling.
 * @docs-private
 */
@Directive({
  selector: '[neo-card-sm-image], [neoCardImageSmall]',
  host: {class: 'neo-card-sm-image'}
})
export class NeoCardSmImage {}

/**
 * Image used in a card, needed to add the mat- CSS styling.
 * @docs-private
 */
@Directive({
  selector: '[neo-card-md-image], [neoCardImageMedium]',
  host: {class: 'neo-card-md-image'}
})
export class NeoCardMdImage {}

/**
 * Image used in a card, needed to add the mat- CSS styling.
 * @docs-private
 */
@Directive({
  selector: '[neo-card-lg-image], [neoCardImageLarge]',
  host: {class: 'neo-card-lg-image'}
})
export class MatCardLgImage {}

/**
 * Large image used in a card, needed to add the mat- CSS styling.
 * @docs-private
 */
@Directive({
  selector: '[neo-card-xl-image], [neoCardImageXLarge]',
  host: {class: 'neo-card-xl-image'}
})
export class NeoCardXlImage {}

/**
 * Avatar image used in a card, needed to add the mat- CSS styling.
 * @docs-private
 */
@Directive({
  selector: '[neo-card-avatar], [neoCardAvatar]',
  host: {class: 'neo-card-avatar'}
})
export class NeoCardAvatar {}


@Directive({
  selector: 'neo-card-actions',
  exportAs: 'neoCardActions',
  host: {
    class: 'neo-card-actions',
    '[class.neo-card-actions-align-end]': 'align === "end"',
    '[class.neo-card-actions-align-center]': 'align === "center"',
  },
})
export class NeoCardActions  {
  @Input() align: 'start' | 'end' | 'center' = 'start';
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
export class NeoCardImage {}

@Component({
  selector: 'neo-card',
  exportAs: 'neoCard',
  templateUrl: './neo-card.component.html',
  styleUrls: ['./neo-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'neo-card mat-focus-indicator',
    '[class._mat-animation-noopable]': 'animationMode === "NoopAnimations"',
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
