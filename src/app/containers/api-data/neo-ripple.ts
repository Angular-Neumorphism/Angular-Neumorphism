import { DescriptionItem } from '../models/index';

export const RIPPLE_API: DescriptionItem[] = [
  {
    apiName: `@Input('neoRippleDisabled')`,
    apiType: `disabled: boolean`,
    description: `Whether click events will not trigger the ripple. Ripples can be still launched manually by using the launch() method.`,
  },
  {
    apiName: `@Input('neoRippleTrigger')`,
    apiType: `trigger: HTMLElement `,
    description: `The element that triggers the ripple when click events are received. Defaults to the directive's host element.`,
  },
];