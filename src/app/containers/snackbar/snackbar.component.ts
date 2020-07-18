import { Component } from '@angular/core';
import { NeoSnackBar } from '@neomorphism/ng-neomorphism/neo-snack-bar';
import { DescriptionItem } from '../models/index';
import {
  NEO_SNACKBAR_PROPS_API,
  NEO_SNACKBAR_METHODS_API,
  NEO_SNACKBAR_CONFIG_API,
  NEO_SNACKBAR_REF_API,
  NEO_SNACKBAR_DIRECTIVE_API
} from '../api-data/index';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
})
export class SnackbarComponent {
  public snackbarPropsApi: DescriptionItem[] = NEO_SNACKBAR_PROPS_API;
  public snackbarMethodsApi: DescriptionItem[] = NEO_SNACKBAR_METHODS_API;
  public snackbarConfigApi: DescriptionItem[] = NEO_SNACKBAR_CONFIG_API;
  public snackbarRefApi: DescriptionItem[] = NEO_SNACKBAR_REF_API;
  snackbarDirectiveApi: DescriptionItem[] = NEO_SNACKBAR_DIRECTIVE_API;
  public currentSelectedIndex = 1.1;
  public changedIndexValue = null;
  public currentIndexValue = 0;

  constructor(private _snackBar: NeoSnackBar) {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  snippetShowingHandler(e) {
    if (e) {
      this.currentSelectedIndex = this.changedIndexValue;
    }
  }

  changeHandler(e) {
    this.changedIndexValue = e;
  }

  indexChangeHandler(index: number) {
    this.currentIndexValue = index;
  }
}
