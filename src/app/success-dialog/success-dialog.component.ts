import { Component, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.css']
})

export class SuccessDialogComponent implements OnInit {
  message = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<SuccessDialogComponent>) {
    this.message = data;
   }

  ngOnInit() {
  }

  closePopup() {
    this.dialogRef.close();
  }

}
