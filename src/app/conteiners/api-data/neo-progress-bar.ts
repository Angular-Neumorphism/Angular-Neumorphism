import { DescriptionItem } from '../models/index';

export const PROGRESS_BAR_STYLE_API: DescriptionItem[] = [
  {
    apiName: '@mixin',
    apiType: `neo-container-progress-bar-background($color)`,
    description: `Receive color at a HEX, RGB or HTML
    color name format as a string and set progressbar inner shadows denending on provided
    background color.`,
  },
  {
    apiName: '@mixin',
    apiType: `neo-progress-bar-background($color)`,
    description: `Apply provided color to a
    progressbar background and adds appropriate shadows. Overrides neo-container-progress-bar-background`,
  },
];

export const PROGRESS_BAR_API: DescriptionItem[] = [
  {
    apiName: `@Input()`,
    apiType: `mode: ProgressBarMode`,
    description: `Mode of the progress bar.
    Input must be one of these values: determinate, indeterminate, buffer, query, defaults to 'determinate'. Mirrored to mode attribute.`,
  },
  {
    apiName: '@Input()',
    apiType: `value: number`,
    description: `Value of the progress bar. Defaults to zero. Mirrored to aria-valuenow.`,
  },
];
