import { Component, ComponentFactoryResolver } from '@angular/core';

import { IonicPage, NavController, NavParams,LoadingController,ToastController,Events} from 'ionic-angular';
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';
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
  alldata:any = [];
  loader:any;
 custid:any;
 customerid:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http,
    public loadingCtrl: LoadingController,public toastCtrl:ToastController,private ev: Events,private alertCtrl: AlertController) {
  
    
      // this.ionViewDidLoad();
 this.loadpaymentdata();

     
  }

  loaddata() {

    // this.showLoading();
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.userId = this.userData.id;
    console.log('ionViewDidLoad PayPage');
    this.http.get(apiUrl+'getcustomerId?userid='+ this.userId).map(res => res.json()).subscribe(result => {
		  this.custid = result;
      // this.hideLoading();
    this.customerid = this.custid[0].customerid;
    console.log(
      this.customerid);
           },
         err => {
          // this.hideLoading();
           console.log(err);
         });
  }
  loadpaymentdata(){
    this.loader = this.loadingCtrl.create({content: 'Loading...'});
    this.loader.present();
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.userId = this.userData.id;
    this.http.get(apiUrl+'addOnDetailById?userid='+ this.userId).map(res => res.json()).subscribe(result => {
      this.alldata = result.response;
     
        this.customerid = this.alldata[0].customerid;
        this.loader.dismiss();
     
      this.loaddata();
    console.log(result);
 
  
           },
         err => {
          this.loader.dismiss();
  
           console.log("error",err);
         });
  }
  showLoading() {
    this.loader = this.loadingCtrl.create({content: 'Loading...'});
    this.loader.present();

  }

  hideLoading() {
    this.loader.dismiss()
  }
  extraPay(pay){
    this.showLoading();
    this.http.get(apiUrl+'addOnExtraPay?userid='+ this.userId+
    '&id='+pay.id+'&customerid='+
    this.customerid+'&amount='+pay.amount+'&username='+ this.userData.username+'&techid='+pay.technicianid+'&name='+pay.name).map(res => res.json()).subscribe(result => {
		  this.custid = result;
     if(result){
      this.hideLoading();
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
     
      this.showToast('Payment success');
      let alert = this.alertCtrl.create({
        title: 'Please Select',
        inputs: [
          {
            type: 'radio',
            label: 'Text',
            value: '0'
          },
          {
            type: 'radio',
            label: 'Email',
            value: '1'
          }
        ],
        buttons: [
          // {
          //   text: 'Cancel',
          //   role: 'cancel',
          //   handler: () => {
          //     console.log('Cancel clicked');
          //   }
          // },
          {
            text: 'OK',
            handler: (data:string) => {
              console.log('OK clicked: ' ,data);
                 if(data == '1'){
                  let amount = Math.round(pay.amount*100);
                  let finalamount = (amount/100);
                  this.http.get(apiUrl+'SendEmail?userid='+ this.userId+'&amount='+finalamount+'&username='+ this.userData.username+'&bookingdate='+new Date()).map(res => res.json()).subscribe(result => {
             console.log("send email",result);
                  });
                 }else if(data == '0'){
                  let amount = Math.round(pay.amount*100);
                  let finalamount = (amount/100);
                  this.http.get(apiUrl+'SendextrapayNotification?userid='+ this.userId+'&amount='+finalamount+'&username='+ this.userData.username).map(res => res.json()).subscribe(result => {
                    console.log("send notification",result);
                  });
                 }

              // I NEED TO GET THE VALUE OF THE SELECTED RADIO BUTTON HERE
            }
          }
        ]
      });
      alert.present();
      this.alldata = [];
      this.loadpaymentdata();
      this.ev.publish('payment success',this.alldata.length);
      // this.loaddata();
     }
    // this.customerid = this.custid.customerid;
    console.log("payresponse",this.custid);
           },
         err => {
          this.hideLoading();
          this.showToast('Some error occur');
           console.log(JSON.stringify(err));
         });
console.log(pay);
  }
  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 4000,
      position: 'bottom'
    });
    toast.present(toast);
  }
}
