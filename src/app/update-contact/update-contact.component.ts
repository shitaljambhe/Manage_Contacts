import { Component, OnInit } from '@angular/core';
import {FormControl , Validators} from '@angular/forms';
import {CommonService } from '../services/common.service';
import {SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-update-contact',
  templateUrl: './update-contact.component.html',
  styleUrls: ['./update-contact.component.css']
})
export class UpdateContactComponent implements OnInit {
  firstNameFormControl = new FormControl('', [
    Validators.required
  ]);

  lastNameFormControl = new FormControl('', [
    Validators.required
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  phoneNoFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[0-9]\d{9}$/)
  ]);
  currentContactObj =  {randomKey: '' , fname: '' , lname: '', email: '', phoneNo: '' , status: 'active'};

  constructor(private CommonSer: CommonService, public dialog: MatDialog, private http: HttpClient) {
      this.currentContactObj = this.CommonSer.currentUpdateRecordObj;
   }

  ngOnInit() {
  }

  updateContact() {
    const headers =  new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const params = new HttpParams().set('randomId', this.currentContactObj.randomKey)
    .set('firstName', this.currentContactObj.fname ).set('lastName', this.currentContactObj.lname)
    .set('phoneNo', this.currentContactObj.phoneNo).set('status', this.currentContactObj.status)
    .set('email', this.currentContactObj.email);
    this.http.post('https://us-central1-contact-info-bbb79.cloudfunctions.net/updateContact', params ,
    {headers: headers}).subscribe(response => {
      if (response['Message'] === 'success') {
          this.openDialog('Contact updated successfully');
      } else {
        this.openDialog('Some went wrong, please try again');
      }
    }, err => {
      console.log(err);
      this.openDialog('Some went wrong, please try again');
    });
  }

  openDialog(message) {
    const dialogRef = this.dialog.open(SuccessDialogComponent, {
      height : '120px',
      width: '400px',
      data : message
    });
  }

}
