import {InjectionToken} from '@angular/core';


/** Default `mat-slide-toggle` options that can be overridden. */
export interface NeoSlideToggleDefaultOptions {
  /** Whether toggle action triggers value changes in slide toggle. */
  disableToggleValue?: boolean;
}

/** Injection token to be used to override the default options for `mat-slide-toggle`. */
export const NEO_SLIDE_TOGGLE_DEFAULT_OPTIONS =
  new InjectionToken<NeoSlideToggleDefaultOptions>('neo-slide-toggle-default-options', {
    providedIn: 'root',
    factory: () => ({disableToggleValue: false})
  });
