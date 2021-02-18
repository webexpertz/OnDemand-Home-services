import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScheduleServicePage } from './schedule-service';

@NgModule({
  declarations: [
    ScheduleServicePage,
  ],
  imports: [
    IonicPageModule.forChild(ScheduleServicePage),
  ],
})
export class ScheduleServicePageModule {}
