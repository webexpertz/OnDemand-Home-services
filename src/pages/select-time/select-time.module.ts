import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectTimePage } from './select-time';

@NgModule({
  declarations: [
    SelectTimePage,
  ],
  imports: [
    IonicPageModule.forChild(SelectTimePage),
  ],
})
export class SelectTimePageModule {}
