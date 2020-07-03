import { Component, OnInit, Inject } from '@angular/core';
import {DialogService} from '../../services/dialog.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(
    private dialogService: DialogService,
  ) {}

  ngOnInit(): void {
  }

  openDialog(){
    this.dialogService.openDialog();
  }

}
