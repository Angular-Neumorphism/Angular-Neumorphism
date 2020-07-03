import { DescriptionItem } from '../models/index';

export const CHECKBOX_STYLE_API: DescriptionItem[] = [
  {
    apiName: '@Input()',
    apiType: `checkMarkColor: string`,
    description: `Receive color at a HEX, RGB or HTML
      color name format as a string to apply it to the checkbox check mark.`,
  },
  {
    apiName: '@mixin',
    apiType: `neo-checkbox-background($color)`,
    description: `Apply provided color to a
      checkbox background and adds appropriate shadows`,
  },
];

export const CHECKBOX_API: DescriptionItem[] = [
  {
    apiName: `@Input("aria-label")`,
    apiType: `ariaLabel: string`,
    description: `Attached to the aria-label
  attribute of the host element. In most cases, aria-labelledby will take
  precedence so this may be omitted.`,
  },
  {
    apiName: '@Input("aria-labelledby")',
    apiType: `ariaLabelledby: string | null`,
    description: `Users can
      specify the aria-labelledby attribute which will be forwarded to the input
      element`,
  },
  {
    apiName: '@Input()',
    apiType: `checked: boolean`,
    description: `Whether the checkbox is checked.`,
  },
  {
    apiName: '@Input()',
    apiType: `disabled: any`,
    description: `Whether the checkbox is disabled.`,
  },
  {
    apiName: '@Input()',
    apiType: `id: string`,
    description: `A unique id for the checkbox input. If none is
      supplied, it will be auto-generated.`,
  },
  {
    apiName: '@Input()',
    apiType: `labelPosition: 'before' | 'after'`,
    description: `Whether the label should
      appear after or before the checkbox. Defaults to 'after'.`,
  },
  {
    apiName: '@Input()',
    apiType: `name: string | null`,
    description: `Name value will be applied to the
      input element if present`,
  },
  {
    apiName: '@Input()',
    apiType: `required: boolean`,
    description: `Whether the checkbox is required.`,
  },
  {
    apiName: '@Input()',
    apiType: `value: string`,
    description: `The value attribute of the native input
      element.`,
  },
  {
    apiName: '@Output()',
    apiType: `change: EventEmitter`,
    description: `Event emitted when the
      checkbox's checked value changes.`,
  },
];
