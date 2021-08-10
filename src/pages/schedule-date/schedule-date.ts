import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import * as moment from 'moment';


/**
 * Generated class for the ScheduleDatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-schedule-date',
  templateUrl: 'schedule-date.html',
})
export class ScheduleDatePage {

  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();
 date :any = new Date();
 value :any = this.date.setDate(this.date.getDate() + 1);
  markDisabled: any = (date: Date) => {
    var current = new Date();
    this.date.setHours(0, 0, 0);
    return date < this.date; 
    //~ return moment(date.toLocaleDateString('en-US',{month:"2-digit", day:"2-digit",year:"numeric"})).isBefore(current.toLocaleDateString('en-US',{month:"2-digit", day:"2-digit",year:"numeric"}));
  };
    
  calendar = {
    mode: 'month',
    currentDate: this.date
  };
  events: any;
  userId: any;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthServiceProvider) {
    this.userId=JSON.parse(localStorage.getItem('userData')).id;
    
  }
 

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }

  onClickNext() {
    let selectedService = this.navParams.get('OBJ');
    let selecteddes = this.navParams.get('des');

    let mutiobj = this.navParams.get('muti');
    console.log("click next "+JSON.stringify(selectedService));
    console.log("click next ", selectedService );
    let obj = {
      service: selectedService,
      multiObj : mutiobj,
      date: this.selectedDay,
      description :selecteddes,
    };
    console.log(obj);
   
    this.navCtrl.push('SelectTimePage', {'OBJ': obj})
  }
}
