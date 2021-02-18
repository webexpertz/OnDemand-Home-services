import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MySelectServicePage } from '../select-service/select-service';

import { StandardPropertyPage } from '../standard-property/standard-property';
import { SpecificRepairPage } from '../specific-repair/specific-repair';

/**
 * Generated class for the ScheduleServicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-schedule-service',
  templateUrl: 'schedule-service.html',
})
export class ScheduleServicePage {

  selectedService = null ;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScheduleServicePage');
  }
  selectService(val){
    if(val == 1){
      this.selectedService = 1;
  }
  if(val == 2){
    this.selectedService = 2;
  }
}

goSelectService(){
  if(this.selectedService == 1){
      this.navCtrl.push(StandardPropertyPage);
  }else{
    this.navCtrl.push(SpecificRepairPage);
  }
  // this.navCtrl.push(MySelectServicePage, {'SER': this.selectedService});
}


}
