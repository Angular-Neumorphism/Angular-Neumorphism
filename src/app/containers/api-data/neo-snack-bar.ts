import { DescriptionItem } from '../models/index';

export const NEO_SNACKBAR_PROPS_API: DescriptionItem[] = [
  {
    apiName: 'handsetCssClass:',
    apiType: `'mat-snack-bar-handset'`,
    description: `The CSS class to applie for handset mode. We use material class here`,
  },
  {
    apiName: 'simpleSnackBarComponent:',
    apiType: `Type<TextOnlySnackBar>`,
    description: `The component that should be rendered as the snack bar's simple component.`,
  },
  {
    apiName: 'snackBarContainerComponent:',
    apiType: `Type<_SnackBarContainer>`,
    description: `The container component that attaches the provided template or component.`,
  },
];

export const NEO_SNACKBAR_METHODS_API: DescriptionItem[] = [
  {
    apiName: 'dismiss',
    apiType: ``,
    description: `Dismisses the currently-visible snack bar.`,
  },
  {
    apiName: 'open',
    apiType: `Parameters - message: string (The message to show in the snackbar.), action: string = '' (The label for the snackbar action.), config?:NeoSnackBarConfig<any>(Additional configuration options for the snackbar.)`,
    description: `Opens a snackbar with a message and an optional action.Returns NeoSnackBarRef<TextOnlySnackBar>`,
  },
  {
    apiName: 'openFromComponent',
    apiType: `Parameters - component :ComponentType<T>(Component to be instantiated.), config?:NeoSnackBarConfig<any>(Additional configuration options for the snackbar.):
        MatDialogConfig<D `,
    description: `Creates and dispatches a snack bar with a custom component for the content, removing any currently opened snack bars.Returns NeoSnackBarRef<TextOnlySnackBar>`,
  },
  {
    apiName: 'openFromTemplate',
    apiType: `Parameters - template TemplateRef<any>(Template to be instantiated.),  config?:NeoSnackBarConfig<any>(Additional configuration options for the snackbar.)`,
    description: `Creates and dispatches a snack bar with a custom template for the content, removing any currently opened snack bars.Returns NeoSnackBarRef<TextOnlySnackBar>`,
  },
];

export const NEO_SNACKBAR_CONFIG_API: DescriptionItem[] = [
  {
    apiName: 'announcementMessage:',
    apiType: `string`,
    description: `Message to be announced by the LiveAnnouncer. When opening a snackbar without a custom component or template, the announcement message will default to the specified message.`,
  },
  {
    apiName: 'data:',
    apiType: `D | null`,
    description: `Data being injected into the child component.`,
  },
  {
    apiName: 'direction:',
    apiType: `Direction`,
    description: `Text layout direction for the snack bar.`,
  },
  {
    apiName: 'horizontalPosition:',
    apiType: `'start' | 'center' | 'end' | 'left' | 'right'`,
    description: `The horizontal position to place the snack bar.`,
  },
  {
    apiName: 'panelClass:',
    apiType: `string | string[]`,
    description: `Extra CSS classes to be added to the snack bar container.`,
  },
  {
    apiName: 'politeness:',
    apiType: `AriaLivePoliteness`,
    description: `The politeness level for the MatAriaLiveAnnouncer announcement.`,
  },
  {
    apiName: 'verticalPosition:',
    apiType: `'top' | 'bottom'`,
    description: `The vertical position to place the snack bar.`,
  },
  {
    apiName: 'viewContainerRef:',
    apiType: `ViewContainerRef`,
    description: `The view container that serves as the parent for the snackbar for the purposes of dependency injection. Note: this does not affect where the snackbar is inserted in the DOM.`,
  },
];

export const NEO_SNACKBAR_REF_API: DescriptionItem[] = [
  {
    apiName: 'afterDismissed:',
    apiType: ``,
    description: `Gets an observable that is notified when the snack bar is finished closing.Returns Observable`,
  },
  {
    apiName: 'afterOpened:',
    apiType: ``,
    description: `Gets an observable that is notified when the snack bar has opened and appeared.Returns Observable`,
  },
  {
    apiName: 'dismiss:',
    apiType: ``,
    description: `Dismisses the snack bar.`,
  },
  {
    apiName: 'dismissWithAction:',
    apiType: ``,
    description: `Marks the snackbar action clicked.`,
  },
  {
    apiName: 'onAction:',
    apiType: ``,
    description: `Gets an observable that is notified when the snack bar action is called.Returns Observable`,
  }
];

export const NEO_SNACKBAR_DIRECTIVE_API: DescriptionItem[] = [
    {
      apiName: 'data:',
      apiType: `{ message: string; action: string; }`,
      description: `Data that was injected into the snack bar.`,
    },
    {
      apiName: 'hasAction:',
      apiType: `boolean`,
      description: `If the action button should be shown.`,
    },
    {
      apiName: 'snackBarRef:',
      apiType: `NeoSnackBarRef<NeoSimpleSnackBar>`,
      description: ``,
    },
    {
        apiName: 'action:',
        apiType: `method`,
        description: `Performs the action on the snack bar.`,
      },
  ];
