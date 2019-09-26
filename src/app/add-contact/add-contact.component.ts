import { Component, OnInit } from '@angular/core';
import { FormControl, Validators} from '@angular/forms';
import {HttpRequest, HttpHeaders, HttpParams , HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
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
  addContactObj = {fname: '' , lname: '', email: '', phoneNo: '' , status: 'active'};
  constructor(private http: HttpClient, public dialog: MatDialog) {

  }

  ngOnInit() {
  }

  addContact() {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const params = new HttpParams().set('firstName', this.addContactObj.fname)
    .set('lastName', this.addContactObj.lname).set('email', this.addContactObj.email).
    set('phoneNo', this.addContactObj.phoneNo).set('status', this.addContactObj.status );
    this.http.post('https://us-central1-contact-info-bbb79.cloudfunctions.net/addContact', params,
    {headers: headers}).subscribe(response => {
        if (response['Message'] === 'success') {
          this.openDialog('Contact added successfully');
          this.addContactObj = {fname: '' , lname: '', email: '', phoneNo: '' , status: 'active'};
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
