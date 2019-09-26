import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import {AddContactComponent } from './add-contact/add-contact.component';
import {ContactListComponent} from './contact-list/contact-list.component';
import { UpdateContactComponent } from './update-contact/update-contact.component';

const routes: Routes = [
  {path : '', component : LandingComponent},
  {path : 'add', component : AddContactComponent},
  {path : 'contactList' , component : ContactListComponent},
  {path : 'updateContact', component : UpdateContactComponent}
];

@NgModule({
  exports: [ RouterModule ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule { }
