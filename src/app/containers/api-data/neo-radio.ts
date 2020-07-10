import { DescriptionItem } from '../models/index';

export const RADIO_BUTTON_API: DescriptionItem[] = [
  {
    apiName: '@Input("aria-describedby")',
    apiType: `ariaDescribedby: string `,
    description: `The 'aria-describedby' attribute is read after the element's label and field type.`,
  },
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
    description: `Whether this radio button is checked.`,
  },
  {
    apiName: '@Input()',
    apiType: `checkMarkColor: string `,
    description: `Receive color at a HEX, RGB or HTML
    color name format as a string to apply it to the radio check mark.`,
  },
  {
    apiName: '@Input()',
    apiType: `disabled: boolean `,
    description: `Whether the radio button is disabled.`,
  },
  {
    apiName: '@Input()',
    apiType: `id: string`,
    description: `The unique ID for the radio button.`,
  },
  {
    apiName: '@Input()',
    apiType: `labelPosition: 'before' | 'after'`,
    description: `Whether the label should appear after or before the radio button. Defaults to 'after'`,
  },
  {
    apiName: '@Input()',
    apiType: `name: string`,
    description: `Analog to HTML 'name' attribute used to group radios for unique selection.`,
  },
  {
    apiName: '@Input()',
    apiType: `required: boolean`,
    description: `Whether the radio button is required.`,
  },
  {
    apiName: '@Input()',
    apiType: `value: any`,
    description: `The value of this radio button.`,
  },
  {
    apiName: '@Output()',
    apiType: `change: EventEmitter<amy>`,
    description: `Event emitted when the checked state of this radio button changes. Change events are only emitted when the value changes due to user interaction with the radio button (the same behavior as <input type-"radio">).`,
  },
];

export const RADIO_GROUP_API: DescriptionItem[] = [
  {
    apiName: '@Input()',
    apiType: `disabled: boolean `,
    description: `Whether the radio group is disabled`,
  },
  {
    apiName: '@Input()',
    apiType: `labelPosition: 'before' | 'after' `,
    description: `Whether the labels should appear after or before the radio-buttons. Defaults to 'after'`,
  },
  {
    apiName: '@Input()',
    apiType: `lname: string `,
    description: `Name of the radio button group. All radio buttons inside this group will use this name.`,
  },
  {
    apiName: '@Input()',
    apiType: `selected: T`,
    description: `The currently selected radio button. If set to a new radio button, the radio group value will be updated to match the new selected button.`,
  },
  {
    apiName: '@Input()',
    apiType: `value: any `,
    description: `Value for the radio-group. Should equal the value of the selected radio button if there is a corresponding radio button with a matching value. If there is not such a corresponding radio button, this value persists to be applied in case a new radio button is added with a matching value.`,
  },{
    apiName: '@Output()',
    apiType: `change: EventEmitter<any>`,
    description: `Event emitted when the group value changes. Change events are only emitted when the value changes due to user interaction with a radio button (the same behavior as <input type-"radio">).`,
  }
];

export const RADIO_STYLE_API: DescriptionItem[] = [

  {
    apiName: '@mixin',
    apiType: `neo-radio-background($color)`,
    description: `Apply provided color to a
    checkbox background and adds appropriate shadows`,
  },
];
