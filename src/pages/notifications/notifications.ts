import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {NotificationDetailPage} from "../notifcation-detail/notifcation-detail";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";

/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
  notifications =[];
  private getNotication: any = [];
  loader :any;
  userId :any;
  constructor(public navCtrl: NavController, public navParams: NavParams,  private authService: AuthServiceProvider, private loadingController: LoadingController, private toastCtrl: ToastController) {
   this.userId=JSON.parse(localStorage.getItem('userData')).id
  }
  ionViewWillEnter(){
    this.initNotification();
  }

  initNotification(){
    this.showLoading();
    this.authService.getAllNotifications(this.userId).then((response) => {
      if(response!=false){
        this.getNotication = response;
        console.log( this.getNotication);
      }
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
  onRequest(notification){
    this.navCtrl.push(NotificationDetailPage,{"OBJ": notification});

  }

}
