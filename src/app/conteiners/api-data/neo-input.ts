import { DescriptionItem } from '../models/index';

export const INPUT_STYLE_API: DescriptionItem[] = [
  {
    apiName: '@mixin',
    apiType: `neo-form-field-background($color)`,
    description: `Receive color at a HEX, RGB or HTML
        color name format as a string to apply it to the formfield background and set
        input color to 5% darker. Also it set input shadows denending on provided
        background color.`,
  }, {
    apiName: '@mixin',
    apiType: `neo-input-background($color)`,
    description: `Set input background and shadows`,
  },
];
export const INPUT_COMMON_API: DescriptionItem[] = [
  {
    apiName: '@Input()',
    apiType: `disabled: boolean`,
    description: `Whether the element is disabled.`,
  },
  {
    apiName: '@Input()',
    apiType: `readonly: boolean`,
    description: `Whether the element is readonly.`,
  },
  {
    apiName: '@Input()',
    apiType: `placeholder: string`,
    description: `Set input placeholder`,
  },
  {
    apiName: '@Input()',
    apiType: `type: string`,
    description: `Input type of the element.`,
  },
  {
    apiName: 'method',
    apiType: `focus`,
    description: `Focuses the input.`,
  },
];
export const TEXTAREA_COMMON_API: DescriptionItem[] = [
  {
    apiName: '@Input("cdkTextareaAutosize")',
    apiType: `enabled: boolean`,
    description: `Whether autosizing is enabled or not.`,
  },
  {
    apiName: '@Input("cdkAutosizeMaxRows")',
    apiType: `maxRows: number`,
    description: `Maximum amount of rows in the textarea.`,
  },
  {
    apiName: '@Input("cdkAutosizeMinRows")',
    apiType: `minRows: number`,
    description: `Minimum amount of rows in the textarea.`,
  },
];
