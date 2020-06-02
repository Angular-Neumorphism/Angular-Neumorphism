import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  Inject,
  isDevMode,
  QueryList,
  ViewEncapsulation,
  OnInit,
} from '@angular/core';
import { CanColor } from '@angular/material/core';
import * as MatToolbarModule from '@angular/material/toolbar';

const TOOLBAR_BACKGROUND_COLOR = ['primary', 'warn'];

@Directive({
  selector: 'neo-toolbar-row',
  exportAs: 'neoToolbarRow',
  host: { class: 'neo-toolbar-row' },
})
export class NeoToolbarRow extends MatToolbarModule.MatToolbarRow {}

@Component({
  selector: 'neo-toolbar',
  exportAs: 'neoToolbar',
  templateUrl: './neo-toolbar.component.html',
  styleUrls: ['./neo-toolbar.component.scss'],
  inputs: ['color'],
  host: {
    class: 'neo-toolbar',
    '[class.neo-toolbar-multiple-rows]': '_toolbarRows.length > 0',
    '[class.neo-toolbar-single-row]': '_toolbarRows.length === 0',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class NeoToolbar extends MatToolbarModule.MatToolbar
  implements CanColor, OnInit, AfterViewInit {
  private _documentRef: Document;

  /** Reference to all toolbar row elements that have been projected. */
  @ContentChildren(NeoToolbarRow, { descendants: true })
  _toolbarRows: QueryList<NeoToolbarRow>;

  constructor(
    elementRef: ElementRef,
    private _platformRef: Platform,
    @Inject(DOCUMENT) document?: any
  ) {
    super(elementRef, _platformRef, document);

    // TODO: make the document a required param when doing breaking changes.
    this._documentRef = document;
  }

  ngOnInit() {
    this.addThemeColor();
  }

  ngAfterViewInit() {
    if (!isDevMode() || !this._platformRef.isBrowser) {
      return;
    }

    this._neoCheckToolbarMixedModes();
    this._toolbarRows.changes.subscribe(() =>
      this._neoCheckToolbarMixedModes()
    );
  }

  addThemeColor() {
    if (this.color && TOOLBAR_BACKGROUND_COLOR.find(color => color === this.color)) {
      this._elementRef.nativeElement.classList.add(`neo-${this.color}`);
    }
  }

  /**
   * Throws an exception when developers are attempting to combine the different toolbar row modes.
   */
  private _neoCheckToolbarMixedModes() {
    if (!this._toolbarRows.length) {
      return;
    }

    // Check if there are any other DOM nodes that can display content but aren't inside of
    // a <neo-toolbar-row> element.
    const isCombinedUsage = Array.from<HTMLElement>(
      this._elementRef.nativeElement.childNodes
    )
      .filter(
        (node) =>
          !(node.classList && node.classList.contains('neo-toolbar-row'))
      )
      .filter(
        (node) =>
          node.nodeType !==
          (this._documentRef ? this._documentRef.COMMENT_NODE : 8)
      )
      .some((node) => !!(node.textContent && node.textContent.trim()));

    if (isCombinedUsage) {
      throwToolbarMixedModesError();
    }
  }
}

/**
 * Throws an exception when attempting to combine the different toolbar row modes.
 * @docs-private
 */
export function throwToolbarMixedModesError() {
  throw Error(
    'NeoToolbar: Attempting to combine different toolbar modes. ' +
      'Either specify multiple `<neo-toolbar-row>` elements explicitly or just place content ' +
      'inside of a `<neo-toolbar>` for a single row.'
  );
}
