import { Component } from '@angular/core';
import {AlertController, App, IonicPage, ModalController, NavController, Platform, ToastController,Events} from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { TabsPage } from '../tabs/tabs';
import {MembershipPage} from "../membership/membership";
import {CardDetailsPage} from "../card-details/card-details";
import {FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import { Http } from '@angular/http';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import {LocalNotifications} from "@ionic-native/local-notifications";
import {NotificationDetailPage} from "../notifcation-detail/notifcation-detail";
import {FCM} from "@ionic-native/fcm";
import { ResetpassPage } from '../resetpass/resetpass';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
}) 
export class LoginPage {

  formgroup:FormGroup;
  username:AbstractControl;
  password:AbstractControl;
  responseData : any;
  userinfo : any;
  private mToken: string;
    data:any;
    value:any;
    alldata:any = [];
  constructor(private fcm: FCM,private alertCtrl: AlertController, public navCtrl: NavController, public authService: AuthServiceProvider, public app: App, public toastCtrl: ToastController,
              private localNotifications: LocalNotifications, public modalCtrl: ModalController, public formbuilder: FormBuilder, public http: Http, public platform: Platform,public storage:Storage,public ev:Events) {
   
   if (this.platform.is("android") || this.platform.is("ios"))
      this.initToken();

    this.formgroup = formbuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.username = this.formgroup.controls['username'];
    this.password = this.formgroup.controls['password'];
  }

   initToken() {
    this.platform.ready().then(() => {
      //Notifications
      this.fcm.subscribeToTopic('technician');
      this.fcm.getToken().then(token => {
        console.log(token);
        this.mToken = token
      });
      this.fcm.onNotification().subscribe(data => {
        if (data.wasTapped) {
          //~ alert("onNotification data.wasTapped "+data);

          console.log("Received in background "+data);
        } else {
          //~ alert("onNotification Received in foreground data.wasTapped else "+data);
          this.showNotification();
          console.log("Received in foreground "+data);
        }
      });
      this.fcm.onTokenRefresh().subscribe(token => {
        console.log(token);
        this.mToken = token
      });

    });
  }

  showNotification(){
    this.localNotifications.schedule({
      id: 1,
      text: 'Service request has been successfully submited',
      sound: 'true',
      data: { secret: "key" }
    });
  }

  presentModal(data) {
    const modal = this.modalCtrl.create(NotificationDetailPage,{"Data":data});
    modal.present();
  }

  login(userData) {
    console.log('userdata',userData);
    this.authService.postData(userData.username, userData.password).then((result) => {
    

      console.log('userdata', this.data);

      this.data = result;
      if (this.data) {
      if(this.data.result){
        this.responseData = this.data.result;
        const data = "email=" + this.responseData[0].email + "&token=" + this.mToken + "&userid=" + this.responseData[0].id;
        this.authService.registerToken(data).then((result) => {

            let planstatus = this.responseData[0].planstatus;
            let cardnum = this.responseData[0].cardnumber;
        console.log( this.responseData);
      
            localStorage.setItem('emailuserData', JSON.stringify(this.responseData[0].email));
            localStorage.setItem('userData', JSON.stringify(this.responseData[0]));
            localStorage.setItem('userName', userData.username);
            localStorage.setItem('userPass', userData.password);
            localStorage.setItem('schemeId', this.responseData[0].schemeid);
          
            this.authService.getALertbadge(this.responseData[0].id).then((result) => {
              this.value = result;
              this.alldata  = this.value.response;
              this.ev.publish('payment success',this.alldata.length);
              console.log("response", this.authService.data );
            });
            this.storage.set('user',this.responseData);
            if (planstatus == 1) {
              this.navCtrl.push(TabsPage);
              this.app.getRootNavs()[0].setRoot(TabsPage);
            } else {
              if (cardnum == '') {
                this.navCtrl.push(MembershipPage);
                this.navCtrl.setRoot(MembershipPage);
              } else {
                if(planstatus==0)
                  this.showExpireAlert();

                this.navCtrl.push(MembershipPage,{'cardDetails':this.getCardDetails(this.responseData[0])});
                this.navCtrl.setRoot(MembershipPage);
              }

            }
          }, (err) => {
          let toast = this.toastCtrl.create({
            message: 'Some error occurs.',
            duration: 3000,
            position: 'bottom'
          });
          toast.present(toast);
          }
        );

      }
      if(this.data.response){
        let toast = this.toastCtrl.create({
          message: this.data.response,
          duration: 3000,
          position: 'bottom'
        });
        toast.present(toast);
      
      }
      } else {
        let toast = this.toastCtrl.create({
          message: 'Email/Username or Password is invalid. ',
          duration: 3000,
          position: 'bottom'
        });
        toast.present(toast);
      }
    }, (err) => {
      console.log("Login Response data " , JSON.parse(err));

    });
  }

  showExpireAlert() {
    let alert = this.alertCtrl.create({
      title: 'Membership',
      subTitle: 'Your membership plan is expired please renew membership for further use.',
      buttons: ['Dismiss']
    });
    alert.present();
  }
  getCardDetails(data) {
    return {
      userId: data.id,
      cardnumber: data.cardnumber,
      cardexpmonth: data.cardexpmonth,
      cardexpyear: data.cardexpyear,
      cardtype: data.cardtype,
      cardname: data.cardname

    }
  }

  sign() {
    this.navCtrl.push(SignupPage);
  }
  forget() {
	 this.navCtrl.push(ResetpassPage);	   
}
}
