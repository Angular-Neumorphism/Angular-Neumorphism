import { DescriptionItem } from '../models/index';

export const SLIDE_TOGGLE_API: DescriptionItem[] = [
  {
    apiName: '@Input("aria-label")',
    apiType: `ariaLabel: string`,
    description: `Used to set the 'aria-label' attribute on the underlying input element.`,
  },
  {
    apiName: '@Input("aria-labelledby")',
    apiType: `ariaLabelledby: string`,
    description: `The 'aria-labelledby' attribute takes precedence as the element's text alternative.`,
  },
  {
    apiName: '@Input()',
    apiType: `checked: boolean `,
    description: `Whether this the slide-toggle is checked.`,
  },
  {
    apiName: '@Input()',
    apiType: `disabled: boolean `,
    description: `Whether the the slide-toggle is disabled.`,
  },
  {
    apiName: '@Input()',
    apiType: `id: string`,
    description: `The unique ID for the the slide-toggle.`,
  },
  {
    apiName: '@Input()',
    apiType: `labelPosition: 'before' | 'after'`,
    description: `Whether the label should appear after or before the slide-toggle. Defaults to 'after'`,
  },
  {
    apiName: '@Input()',
    apiType: `name: string`,
    description: `Name value will be applied to the input element if present.`,
  },
  {
    apiName: '@Input()',
    apiType: `required: boolean`,
    description: `Whether the slide-toggle is required.`,
  },

  {
    apiName: '@Output()',
    apiType: `change: EventEmitter<amy>`,
    description: `An event will be dispatched each time the slide-toggle changes its value.`,
  },
  {
    apiName: '@Output()',
    apiType: `toggleChange: EventEmitter<void>`,
    description: `An event will be dispatched each time the slide-toggle input is toggled. This event is always emitted when the user toggles the slide toggle, but this does not mean the slide toggle's value has changed.`,
  },
];

export const SLIDE_TOGGLE_STYLE_API: DescriptionItem[] = [
  {
    apiName: '@mixin',
    apiType: `neo-slide-toggle-checked($color)`,
    description: `Apply provided color to a
      slide-toggle when it is checked.`,
  },
  {
    apiName: '@mixin',
    apiType: `neo-slide-toggle-background($outsideColor, $insideColor?)`,
    description: `Apply provided outside color as to a
        slide-toggle background and inside shadows as to outside shadows. insideColor parameter is optional and apply provided color to a
        slide-toggle inside background and shadows.`,
  },
];
