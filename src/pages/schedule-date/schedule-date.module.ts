import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScheduleDatePage } from './schedule-date';
import { NgCalendarModule  } from 'ionic2-calendar';

@NgModule({
  declarations: [
    ScheduleDatePage,
  ],
  imports: [
    IonicPageModule.forChild(ScheduleDatePage),
    NgCalendarModule
  ],
})
export class ScheduleDatePageModule {}
