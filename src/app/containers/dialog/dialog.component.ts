import { Component, OnInit } from '@angular/core';
import { DialogService } from '../../services/dialog.service';
import {
  NEO_DIALOG_PROPS_API,
  NEO_DIALOG_METHODS_API,
  NEO_DIALOG_CONFIG_API,
  NEO_DIALOG_DIRECTIVE_CLOSE_API,
  NEO_DIALOG_DIRECTIVE_TITLE_API,
  NEO_DIALOG_REF_API,
} from '../api-data/index';
import { DescriptionItem } from '../models/index';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  public dialogPropsApi: DescriptionItem[] = NEO_DIALOG_PROPS_API;
  public dialogMethodsApi: DescriptionItem[] = NEO_DIALOG_METHODS_API;
  public dialogConfigApi: DescriptionItem[] = NEO_DIALOG_CONFIG_API;
  public dialogDirectiveCloseApi: DescriptionItem[] = NEO_DIALOG_DIRECTIVE_CLOSE_API;
  public dialogDirectiveTitleApi: DescriptionItem[] = NEO_DIALOG_DIRECTIVE_TITLE_API;
  public dialogRefgApi: DescriptionItem[] = NEO_DIALOG_REF_API;
  public currentSelectedIndex = 1.1;
  public changedIndexValue = null;
  public currentIndexValue = 0;
  public name: string;

  constructor(private dialogService: DialogService) {}

  ngOnInit(): void {}

  openDialog() {
    this.dialogService.openDialog();
  }

  openConfiguratedDialog() {
    this.dialogService.openConfiguratedDialog().subscribe((data) => {
      if (data.name) {
        this.name = data.name;
      }
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
