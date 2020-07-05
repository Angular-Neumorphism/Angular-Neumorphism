/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { AriaDescriber } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  Component,
  ElementRef,
  Inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  Optional,
  Renderer2,
  SimpleChanges,
  isDevMode,
  ViewEncapsulation,
} from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import * as MatBadgeModule from '@angular/material/badge';

let nextId = 0;

// Boilerplate for applying mixins to MatBadge.
/** @docs-private */
class MatBadgeBase {}

/** Allowed position options for matBadgePosition */
export type NeoBadgePosition =
  | 'above after'
  | 'above before'
  | 'below before'
  | 'below after'
  | 'before'
  | 'after'
  | 'above'
  | 'below';

/** Allowed size options for NeoBadgeSize */
export type NeoBadgeSize = 'small' | 'medium' | 'large';

/** Directive to display a text badge. */
@Component({
  selector: 'neo-badge',
  templateUrl: 'neo-badge.component.html',
  styleUrls: ['neo-badge.component.scss'],
  host: {
    class: 'neo-badge',
    '[class.neo-badge-overlap]': 'overlap',
    '[class.neo-badge-above]': 'isAbove()',
    '[class.neo-badge-below]': '!isAbove()',
    '[class.neo-badge-before]': '!isAfter()',
    '[class.neo-badge-after]': 'isAfter()',
    '[class.neo-badge-small]': 'size === "small"',
    '[class.neo-badge-medium]': 'size === "medium"',
    '[class.neo-badge-large]': 'size === "large"',
    '[class.neo-badge-hidden]': 'hidden || !_hasContent',
    '[class.neo-badge-disabled]': 'badgeDisabled',
  },
  encapsulation: ViewEncapsulation.None,
})
export class NeoBadge extends MatBadgeModule.MatBadge
  implements OnChanges, OnDestroy {
  @Input('neoBadgeDisabled')
  get badgeDisabled(): boolean {
    return this._badgeDisabled;
  }
  set badgeDisabled(value: boolean) {
    this._badgeDisabled = coerceBooleanProperty(value);
  }

  @Input('neoBadgeColor')
  get colorNeo(): string {
    return this._colorNeo;
  }
  set colorNeo(value: string) {
    this._colorNeo = value;
  }

  /** Whether the badge should overlap its contents or not */
  @Input('neoBadgeOverlap')
  get overlap(): boolean {
    return this._overlapNeo;
  }
  set overlap(val: boolean) {
    this._overlapNeo = coerceBooleanProperty(val);
  }

  /** Message used to describe the decorated element via aria-describedby */
  @Input('neoBadgeDescription')
  get description(): string {
    return this._descriptionNeo;
  }
  set description(newDescription: string) {
    if (newDescription !== this._descriptionNeo) {
      const badgeElement = this._badgeElementNeo;
      this._updateHostAriaDescriptionNeo(newDescription, this._descriptionNeo);
      this._descriptionNeo = newDescription;

      if (badgeElement) {
        newDescription
          ? badgeElement.setAttribute('aria-label', newDescription)
          : badgeElement.removeAttribute('aria-label');
      }
    }
  }

  /** Whether the badge is hidden. */
  @Input('neoBadgeHidden')
  get hidden(): boolean {
    return this._hiddenNeo;
  }
  set hidden(val: boolean) {
    this._hiddenNeo = coerceBooleanProperty(val);
  }

  constructor(
    private _ngZoneNeo: NgZone,
    private _elementRefNeo: ElementRef<HTMLElement>,
    private _ariaDescriberNeo: AriaDescriber,
    private _rendererNeo: Renderer2,
    @Optional()
    @Inject(ANIMATION_MODULE_TYPE)
    private _animationModeNeo?: string
  ) {
    super(_ngZoneNeo, _elementRefNeo, _ariaDescriberNeo, _rendererNeo, null);

    if (isDevMode()) {
      const nativeElement = _elementRefNeo.nativeElement;
      if (nativeElement.nodeType !== nativeElement.ELEMENT_NODE) {
        throw Error('neoBadge must be attached to an element node.');
      }
    }
  }

  static ngAcceptInputType_disabled: BooleanInput;
  static ngAcceptInputType_hidden: BooleanInput;
  static ngAcceptInputType_overlap: BooleanInput;
  /** Whether the badge has any content. */
  _hasContent = false;
  private _badgeDisabled = false;
  private _colorNeo = '#2086ed';
  private _overlapNeo = true;

  /**
   * Position the badge should reside.
   * Accepts any combination of 'above'|'below' and 'before'|'after'
   */
  @Input('neoBadgePosition') position: NeoBadgePosition = 'above after';

  /** The content for the badge */
  @Input('neoBadge') content: string;
  private _descriptionNeo: string;

  /** Size of the badge. Can be 'small', 'medium', or 'large'. */
  @Input('neoBadgeSize') size: NeoBadgeSize = 'medium';
  private _hiddenNeo: boolean;

  /** Unique id for the badge */
  _id: number = nextId++;

  private _badgeElementNeo: HTMLElement | undefined;

  /** Whether the badge is above the host or not */
  isAbove(): boolean {
    return this.position.indexOf('below') === -1;
  }

  /** Whether the badge is after the host or not */
  isAfter(): boolean {
    return this.position.indexOf('before') === -1;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.badgeDisabled && this.getBadgeElement()) {
      this._setColorNeo(this.colorNeo);
    }
    const contentChange = changes.content;
    if (contentChange) {
      const value = contentChange.currentValue;
      this._hasContent = value != null && `${value}`.trim().length > 0;
      this._updateTextContentNeo();
    }
  }

  ngOnDestroy() {
    const badgeElement = this._badgeElementNeo;

    if (badgeElement) {
      if (this.description) {
        this._ariaDescriberNeo.removeDescription(
          badgeElement,
          this.description
        );
      }

      // When creating a badge through the Renderer, Angular will keep it in an index.
      // We have to destroy it ourselves, otherwise it'll be retained in memory.
      if (this._rendererNeo.destroyNode) {
        this._rendererNeo.destroyNode(badgeElement);
      }
    }
  }

  /**
   * Gets the element into which the badge's content is being rendered.
   * Undefined if the element hasn't been created (e.g. if the badge doesn't have content).
   */
  getBadgeElement(): HTMLElement | undefined {
    return this._badgeElementNeo;
  }

  /** Injects a span element into the DOM with the content. */
  private _updateTextContentNeo(): HTMLSpanElement {
    if (!this._badgeElementNeo) {
      this._badgeElementNeo = this._createBadgeElementNeo();
      this._setColorNeo(this.colorNeo);
    } else {
      this._badgeElementNeo.textContent = this.content;
    }
    return this._badgeElementNeo;
  }

  /** Creates the badge element */
  private _createBadgeElementNeo(): HTMLElement {
    const badgeElement = this._rendererNeo.createElement('span');
    const activeClass = 'neo-badge-active';
    const contentClass = 'neo-badge-content';

    // Clear any existing badges which may have persisted from a server-side render.
    this._clearExistingBadgesNeo(contentClass);
    badgeElement.setAttribute('id', `neo-badge-content-${this._id}`);
    badgeElement.classList.add(contentClass);
    badgeElement.textContent = this.content;

    if (this._animationModeNeo === 'NoopAnimations') {
      badgeElement.classList.add('_mat-animation-noopable');
    }

    if (this.description) {
      badgeElement.setAttribute('aria-label', this.description);
    }
    this._elementRefNeo.nativeElement.appendChild(badgeElement);

    // animate in after insertion
    if (
      typeof requestAnimationFrame === 'function' &&
      this._animationModeNeo !== 'NoopAnimations'
    ) {
      this._ngZoneNeo.runOutsideAngular(() => {
        requestAnimationFrame(() => {
          badgeElement.classList.add(activeClass);
        });
      });
    } else {
      badgeElement.classList.add(activeClass);
    }

    return badgeElement;
  }

  /** Sets the aria-label property on the element */
  private _updateHostAriaDescriptionNeo(
    newDescription: string,
    oldDescription: string
  ): void {
    // ensure content available before setting label
    const content = this._updateTextContentNeo();

    if (oldDescription) {
      this._ariaDescriberNeo.removeDescription(content, oldDescription);
    }

    if (newDescription) {
      this._ariaDescriberNeo.describe(content, newDescription);
    }
  }

  /** Adds css theme class given the color to the component host */
  private _setColorNeo(color: string) {
    if (!this.badgeDisabled) {
      this._rendererNeo.setStyle(
        this.getBadgeElement(),
        'background-color',
        color
      );
    } else {
      this._rendererNeo.setStyle(
        this.getBadgeElement(),
        'background-color',
        '#EBEBEB'
      );
    }
  }

  /** Clears any existing badges that might be left over from server-side rendering. */
  private _clearExistingBadgesNeo(cssClass: string) {
    const element = this._elementRefNeo.nativeElement;
    let childCount = element.children.length;

    // Use a reverse while, because we'll be removing elements from the list as we're iterating.
    while (childCount--) {
      const currentChild = element.children[childCount];

      if (currentChild.classList.contains(cssClass)) {
        element.removeChild(currentChild);
      }
    }
  }
}

// @Component({
//   selector: 'app-neo-badge',
//   templateUrl: './neo-badge.component.html',
//   styleUrls: ['./neo-badge.component.scss']
// })
// export class NeoBadgeComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
