import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TermServicesPage } from './term-services';

@NgModule({
  declarations: [
    TermServicesPage,
  ],
  imports: [
    IonicPageModule.forChild(TermServicesPage),
  ],
})
export class TermServicesPageModule {}
