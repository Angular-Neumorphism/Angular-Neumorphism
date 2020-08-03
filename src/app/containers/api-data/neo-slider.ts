import { DescriptionItem } from '../models/index';

export const NEO_SLIDER_API: DescriptionItem[] = [
  {
    apiName: '@Input()',
    apiType: `disabled: boolean `,
    description: `Whether the component is disabled.`,
  },
  {
    apiName: '@Input()',
    apiType: `invert: boolean `,
    description: `Whether the slider is inverted.`,
  },
  {
    apiName: '@Input()',
    apiType: `max: number`,
    description: `The maximum value that the slider can have.`,
  },
  {
    apiName: '@Input()',
    apiType: `min: number`,
    description: `The minimum value that the slider can have.`,
  },
  {
    apiName: '@Input()',
    apiType: `step: number`,
    description: `The values at which the thumb will snap.`,
  },
  {
    apiName: '@Input()',
    apiType: `tickInterval: number | "auto"`,
    description: `How often to show ticks. Relative to the step so that a tick always appears on a step. Ex: Tick interval of 4 with a step of 3 will draw a tick every 4 steps (every 12 values).`,
  },
  {
    apiName: '@Input()',
    apiType: `value: number | null`,
    description: `Value of the slider.`,
  },
  {
    apiName: '@Input()',
    apiType: `vertical: boolean`,
    description: `Whether the slider is vertical.`,
  },
  {
    apiName: '@Output()',
    apiType: `change: EventEmitter<value: number | null>`,
    description: `Event emitted when the slider value has changed.`,
  },
  {
    apiName: 'displayValue: string | number',
    apiType: ``,
    description: `The value to be used for display purposes.`,
  },
  {
    apiName: 'onTouched: () => any',
    apiType: ``,
    description: `onTouch function registered via registerOnTouch (ControlValueAccessor).`,
  },
  {
    apiName: 'percent: number',
    apiType: ``,
    description: `The percentage of the slider that coincides with the value.`,
  },
];

export const NEO_SLIDER_STYLE_API: DescriptionItem[] = [
    {
      apiName: '@Input()',
      apiType: `neoConfig = {
        backgroundColor: hexOrRgbColor: string | null
      } `,
      description: `Theme color palette for the component. backgroundColor set background color to slider track`,
    }
  ];
