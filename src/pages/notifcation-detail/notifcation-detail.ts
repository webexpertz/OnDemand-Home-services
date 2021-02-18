import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController,App, NavParams, ToastController} from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the NotificationDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notifcation-detail',
  templateUrl: 'notifcation-detail.html',
})
export class NotificationDetailPage {
  notiDetail: any = {};
  public loader: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public app: App,  private  authService: AuthServiceProvider, private loadingController: LoadingController,
              private toastCtrl: ToastController) {
    this.notiDetail = this.navParams.get('OBJ');

  }


  onOkClick() {
   this.navCtrl.push(TabsPage);
  //  this.app.getRootNavs()[0].setRoot(TabsPage);
  }

  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 1000,
      position: 'bottom'
    });
    toast.present(toast);

  }

  showLoading() {
    this.loader = this.loadingController.create({content: 'Please wait...'});
    this.loader.present();

  }

  hideLoading() {
    this.loader.dismiss()
  }

}
