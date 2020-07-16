import { DescriptionItem } from '../models/index';

export const TABS_STYLE_API: DescriptionItem[] = [
  {
    apiName: '@mixin',
    apiType: `neo-tabs-background($color)`,
    description: `Receive color at a HEX, RGB or HTML
    color name format as a string, set tabs background and set highlighted tab's header 5% darker than provided
    background color.Also set appropriate shadows`,
  },
  {
    apiName: '@mixin',
    apiType: `neo-tabs-header-background($color)`,
    description: `Apply provided color to a
    highlighted tab's header and adds appropriate shadows. Overrides neo-tabs-background`,
  },
];

export const TABS_API: DescriptionItem[] = [
  {
    apiName: `@Input('aria-label')`,
    apiType: `ariaLabel: string`,
    description: `Aria label for the tab.`,
  },
  {
    apiName: `@Input('aria-labelledby')`,
    apiType: `ariaLabelledby: string`,
    description: `Reference to the element that the tab is labelled by. Will be cleared if aria-label is set at the same time.`,
  },
  {
    apiName: `@Input()`,
    apiType: `disabled: boolean`,
    description: `Whether the component is disabled.`,
  },
  {
    apiName: `@Input('label')`,
    apiType: `textLabel: string`,
    description: `Plain text label for the tab, used when there is no template label.`,
  },
];

export const TAB_GROUP_API: DescriptionItem[] = [
  {
    apiName: `@Input()`,
    apiType: `animationDuration: string`,
    description: `Duration for the tab animation. Will be normalized to milliseconds if no units are set.`,
  },
  {
    apiName: `@Input()`,
    apiType: `disablePagination: boolean`,
    description: `Whether pagination should be disabled. This can be used to avoid unnecessary layout recalculations if it's known that pagination won't be required.`,
  },
  {
    apiName: `@Input()`,
    apiType: `headerPosition: 'above' | 'below';`,
    description: `Position of the tab header.`,
  },
  {
    apiName: `@Input()`,
    apiType: `selectedIndex: number | null`,
    description: `The index of the active tab.`,
  },
  {
    apiName: `@Input()`,
    apiType: `neo-align-tabs: "start"| "center | "end"`,
    description: `Align tabs header.`,
  },
  {
    apiName: `@Output()`,
    apiType: `animationDone: EventEmitter<void>`,
    description: `Event emitted when the body animation has completed`,
  },
  {
    apiName: `@Output()`,
    apiType: `focusChange:: EventEmitter<any>`,
    description: `Event emitted when focus has changed within a tab group.`,
  },
  {
    apiName: `@Output()`,
    apiType: `selectedIndexChange: EventEmitter<number>`,
    description: `Output to enable support for two-way binding on [(selectedIndex)]`,
  },
  {
    apiName: `@Output()`,
    apiType: `selectedTabChange: EventEmitter<MatTabChangeEvent>`,
    description: `Event emitted when the tab selection has changed`,
  },
];
