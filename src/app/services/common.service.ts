import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CommonService {
  currentUpdateRecordObj =  {randomKey: '' , fname: '' , lname: '', email: '', phoneNo: '' , status: 'active'};
  constructor(public http: HttpClient) { }
  getCurrentUpdateRecordDetails(randomKey, firstName, lastName, phoneNo, email, status) {
    this.currentUpdateRecordObj = {randomKey: '' , fname: '' , lname: '', email: '', phoneNo: '' , status: ''};
    this.currentUpdateRecordObj.fname = firstName;
    this.currentUpdateRecordObj.lname = lastName;
    this.currentUpdateRecordObj.email = email;
    this.currentUpdateRecordObj.phoneNo = phoneNo;
    this.currentUpdateRecordObj.status = status;
    this.currentUpdateRecordObj.randomKey = randomKey;
  }
}
