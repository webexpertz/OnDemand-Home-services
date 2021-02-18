import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerCalenderPage } from './customer-calender';
import {NgCalendarModule} from "ionic2-calendar";

@NgModule({
  declarations: [
    CustomerCalenderPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerCalenderPage),
    NgCalendarModule
  ],
})
export class CustomerCalenderPageModule {}
