import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController} from 'ionic-angular';
import { Http } from '@angular/http';
let apiUrl="http://ondemandhome.betaplanets.com/Webservice/";
/**
 * Generated class for the PayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pay',
  templateUrl: 'pay.html',
})
export class PayPage {
  userData:any;
  userId:any;
  alldata:any;
  loader:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http,
    public loadingCtrl: LoadingController) {
      this.showLoading();
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.userId = this.userData.id;
    this.http.get(apiUrl+'addOnDetailById?userid='+ this.userId).map(res => res.json()).subscribe(result => {
		  this.alldata = result.response;
    console.log(result);
    this.hideLoading();
           },
         err => {
          this.hideLoading();
           console.log(err);
         });
     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PayPage');
  }
  showLoading() {
    this.loader = this.loadingCtrl.create({content: 'Loading...'});
    this.loader.present();

  }

  hideLoading() {
    this.loader.dismiss()
  }

}
