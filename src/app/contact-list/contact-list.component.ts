import { Component, OnInit } from '@angular/core';
import {HttpClient , HttpHeaders, HttpParams} from '@angular/common/http';
import {SuccessDialogComponent} from '../success-dialog/success-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {CommonService } from '../services/common.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contactList: any = [];
  constructor(private http: HttpClient, private dialog: MatDialog, public commonSer: CommonService,
  private router: Router) {
    this.getContactList();
  }

  ngOnInit() {
  }

  getContactList() {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const params = new HttpParams();
    this.http.post('https://us-central1-contact-info-bbb79.cloudfunctions.net/getContactList',
    params, {headers : headers}).subscribe(response => {
      if (response['Message'] === 'success') {
        const Data = response['data'];
        const keysArr = Object.keys(Data);
        this.contactList = [];
        for (let i = 0; i < keysArr.length ; i++) {
            const randomId = keysArr[i];
            let obj = {};
            obj = Data[randomId];
            obj['randomKey'] = randomId;
            this.contactList.push(obj);
            console.log('contactList', this.contactList);
        }
      } else {
          this.contactList = [];
      }
    });
  }

  deleteContactFormList(randomKey, index) {
      const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      const params = new HttpParams().set('randomId', randomKey);
      this.http.post('https://us-central1-contact-info-bbb79.cloudfunctions.net/removeContact', 
      params, {headers: headers}).subscribe(response => {
          if (response['Message'] === 'success') {
            this.openDialog('Contact deleted successfully');
            this.contactList.splice(index, 1);
          } else {
            this.openDialog('Some went wrong, please try again');
          }
      });
  }

  updateContact(randomKey, firstName, lastName, phoneNo, email, status) {
    this.commonSer.getCurrentUpdateRecordDetails(randomKey, firstName, lastName,
    phoneNo, email, status);
      this.router.navigate(['/updateContact']);
  }

  openDialog(message) {
    const dialogRef = this.dialog.open(SuccessDialogComponent, {
      height : '120px',
      width: '400px',
      data : message
    });
  }



}
