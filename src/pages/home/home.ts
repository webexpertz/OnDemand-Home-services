import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import { NotificationsPage } from '../notifications/notifications';
import { MyAccountPage } from '../my-account/my-account';
import { MySelectServicePage } from '../select-service/select-service';
import { ScheduleCalendarPage } from '../schedule-calendar/schedule-calendar';
import { ScheduleServicePage } from '../schedule-service/schedule-service';

import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  notifications =[];
  private getNotication: any = [];
  loader :any;
  userId :any;
  constructor(public navCtrl: NavController, public navParams: NavParams,  private authService: AuthServiceProvider, 
  private loadingController: LoadingController) {
   this.userId=JSON.parse(localStorage.getItem('userData')).id;
   
  }
  ionViewWillEnter(){
    this.initNotification();
  }

  initNotification(){
    this.showLoading();
    this.authService.getAllAcceptBookings(this.userId).then((response) => {
      if(response!=false)
        this.getNotication = response;
      else this.getNotication=[];
      this.hideLoading();
    });
  }
  showLoading() {
    this.loader = this.loadingController.create({content: 'Loading...'});
    this.loader.present();

  }

  hideLoading() {
    this.loader.dismiss()
  }
 
	onMyAccount(){
		this.navCtrl.push(MyAccountPage);
	}
	onNotifiaction(){
		this.navCtrl.setRoot(NotificationsPage);
	}
	onSchedule(){
    // this.navCtrl.setRoot(MySelectServicePage);
    this.navCtrl.setRoot(TabsPage,{indexof:'1'});

    
	}
	onServiceSchedule(){
		this.navCtrl.setRoot(ScheduleCalendarPage);
	}

}
