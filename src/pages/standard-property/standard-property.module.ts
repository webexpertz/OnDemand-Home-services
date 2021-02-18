import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StandardPropertyPage } from './standard-property';

@NgModule({
  declarations: [
    StandardPropertyPage,
  ],
  imports: [
    IonicPageModule.forChild(StandardPropertyPage),
  ],
})
export class StandardPropertyPageModule {}
