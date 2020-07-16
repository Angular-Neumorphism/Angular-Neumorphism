import { DescriptionItem } from '../models/index';

export const NEO_DIALOG_PROPS_API: DescriptionItem[] = [
  {
    apiName: 'afterAllClosed',
    apiType: `Observable<void>`,
    description: `Stream that emits when all open dialog have finished closing. Will emit on subscribe if there are no open dialogs to begin with.`,
  },
  {
    apiName: 'afterOpened',
    apiType: `Subject<MatDialogRef<any>>`,
    description: `Stream that emits when a dialog has been opened.`,
  },
  {
    apiName: 'openDialogs',
    apiType: `NeoDialogRef<any>[]`,
    description: `Keeps track of the currently-open dialogs.`,
  },
];

export const NEO_DIALOG_METHODS_API: DescriptionItem[] = [
  {
    apiName: 'closeAll',
    apiType: ``,
    description: `Closes all of the currently-open dialogs.`,
  },
  {
    apiName: 'getDialogById',
    apiType: `Parameters - id`,
    description: `Finds an open dialog by its id.`,
  },
  {
    apiName: 'open',
    apiType: `Parameters - componentOrTemplateRef :ComponentType<T> | TemplateRef<T>, config?:
      MatDialogConfig<D `,
    description: `Receive type of the component to load into the dialog, or a TemplateRef to instantiate as the dialog content and extra configuration options.Reference to the newly-opened dialog.`,
  },
];

export const NEO_DIALOG_CONFIG_API: DescriptionItem[] = [
  {
    apiName: 'ariaDescribedBy:',
    apiType: `string | null`,
    description: `ID of the element that describes the dialog.`,
  },
  {
    apiName: 'ariaLabel:',
    apiType: `string | null`,
    description: `Aria label to assign to the dialog element.`,
  },
  {
    apiName: 'ariaLabelledBy:',
    apiType: `string | null`,
    description: `ID of the element that labels the dialog.`,
  },
  {
    apiName: 'autoFocus:',
    apiType: `boolean`,
    description: `Whether the dialog should focus the first focusable element on open.`,
  },
  {
    apiName: 'backdropClass:',
    apiType: `string`,
    description: `Custom class for the backdrop.`,
  },
  {
    apiName: 'closeOnNavigation:',
    apiType: `boolean`,
    description: `Whether the dialog should close when the user goes backwards/forwards in history. Note that this usually doesn't include clicking on links (unless the user is using the HashLocationStrategy).`,
  },
  {
    apiName: 'componentFactoryResolver:',
    apiType: `ComponentFactoryResolver`,
    description: `Alternate ComponentFactoryResolver to use when resolving the associated component.`,
  },
  {
    apiName: 'data:',
    apiType: `D | null`,
    description: ` Data being injected into the child component.`,
  },
  {
    apiName: 'direction:',
    apiType: `Direction`,
    description: `Layout direction for the dialog's content.`,
  },
  {
    apiName: 'disableClose:',
    apiType: `boolean`,
    description: `Whether the user can use escape or clicking on the backdrop to close the modal.`,
  },
  {
    apiName: 'hasBackdrop:',
    apiType: `boolean`,
    description: `Whether the dialog has a backdrop.`,
  },
  {
    apiName: 'height:',
    apiType: `string`,
    description: `Height of the dialog.`,
  },
  {
    apiName: 'id:',
    apiType: `string`,
    description: `ID for the dialog. If omitted, a unique one will be generated.`,
  },
  {
    apiName: 'maxHeight:',
    apiType: `number | string`,
    description: `Max-height of the dialog. If a number is provided, assumes pixel units.`,
  },
  {
    apiName: 'maxWidth:',
    apiType: `number | string`,
    description: `Max-width of the dialog. If a number is provided, assumes pixel units. Defaults to 80vw.`,
  },
  {
    apiName: 'minHeight:',
    apiType: `number | string`,
    description: `Min-height of the dialog. If a number is provided, assumes pixel units.`,
  },
  {
    apiName: 'minWidth:',
    apiType: `number | string`,
    description: `Min-width of the dialog. If a number is provided, assumes pixel units.`,
  },
  {
    apiName: 'panelClass:',
    apiType: `string | string[]`,
    description: `Custom class for the overlay pane.`,
  },
  {
    apiName: 'position:',
    apiType: `bottom | left | right | top`,
    description: `Position overrides.`,
  },
  {
    apiName: 'restoreFocus:',
    apiType: `boolean`,
    description: `Whether the dialog should restore focus to the previously-focused element, after it's closed.`,
  },
  {
    apiName: 'role:',
    apiType: `'dialog' | 'alertdialog'`,
    description: `The ARIA role of the dialog element.`,
  },
  {
    apiName: 'scrollStrategy:',
    apiType: `ScrollStrategy`,
    description: `Scroll strategy to be used for the dialog.`,
  },
  {
    apiName: 'viewContainerRef:',
    apiType: `ViewContainerRef`,
    description: `Where the attached component should live in Angular's logical component tree. This affects what is available for injection and the change detection order for the component instantiated inside of the dialog. This does not affect where the dialog content will be rendered.`,
  },
  {
    apiName: 'width:',
    apiType: `string`,
    description: `Width of the dialog.`,
  },
];

export const NEO_DIALOG_DIRECTIVE_CLOSE_API: DescriptionItem[] = [
  {
    apiName: `@Input('aria-label')`,
    apiType: `ariaLabel: string`,
    description: `Screenreader label for the button.`,
  },
  {
    apiName: `@Input('mat-dialog-close')`,
    apiType: `dialogResult: any`,
    description: `Dialog close input.`,
  },
  {
    apiName: '@Input()',
    apiType: `type: 'submit' | 'button' | 'reset'`,
    description: `Default to "button" to prevents accidental form submits.`,
  },
];

export const NEO_DIALOG_DIRECTIVE_TITLE_API: DescriptionItem[] = [
  {
    apiName: `@Input()`,
    apiType: `ariaLabel: string`,
    description: `id: string`,
  },
];

export const NEO_DIALOG_REF_API: DescriptionItem[] = [
  {
    apiName: `addPanelClass`,
    apiType: `Parameters - string | string[]`,
    description: `Add a CSS class or an array of classes to the overlay pane`,
  },
  {
    apiName: `afterClosed`,
    apiType: ``,
    description: `Gets an observable that is notified when the dialog is finished closing.`,
  },
  {
    apiName: `afterOpened`,
    apiType: ``,
    description: `Gets an observable that is notified when the dialog is finished opening.`,
  },
  {
    apiName: `backdropClick`,
    apiType: ``,
    description: `Gets an observable that emits when the overlay's backdrop has been clicked.`,
  },
  {
    apiName: `beforeClosed`,
    apiType: ``,
    description: `Gets an observable that is notified when the dialog has started closing.`,
  },
  {
    apiName: `close`,
    apiType: `Parameters- dialogResult?:R`,
    description: `Close the dialog.`,
  },
  {
    apiName: `getState`,
    apiType: ``,
    description: `Gets the current state of the dialog's lifecycle.`,
  },
  {
    apiName: `keydownEvents`,
    apiType: ``,
    description: `Gets an observable that emits when keydown events are targeted on the overlay.`,
  },
  {
    apiName: `removePanelClass`,
    apiType: `Parameters - string | string[]`,
    description: `Remove a CSS class or an array of classes from the overlay pane.`,
  },
  {
    apiName: `updatePosition`,
    apiType: `Parameters - bottom | left | right | top`,
    description: `Updates the dialog's position.`,
  },
  {
    apiName: `updateSize`,
    apiType: `Parameters - width string = '', height string = ''`,
    description: `Updates the dialog's width and height.`,
  },
];
