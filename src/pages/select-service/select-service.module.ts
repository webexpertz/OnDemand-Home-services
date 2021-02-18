import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MySelectServicePage } from './select-service';

@NgModule({
  declarations: [
    MySelectServicePage,
  ],
  imports: [
    IonicPageModule.forChild(MySelectServicePage),
  ],
})
export class SelectServicePageModule {}
