import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController,ToastController, App, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Http } from '@angular/http';

import { LoginPage } from '../pages/login/login';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { AboutUsPage } from '../pages/about-us/about-us';
import { MyAccountPage } from '../pages/my-account/my-account';
import {MembershipPage} from "../pages/membership/membership";
import {AuthServiceProvider} from "../providers/auth-service/auth-service";
import {NotificationsPage} from "../pages/notifications/notifications";
import { TabsPage } from '../pages/tabs/tabs';
import  { PayPage} from '../pages/pay/pay';
import { Events } from 'ionic-angular'
import { Storage } from '@ionic/storage';

let apiUrl="http://ondemandhome.betaplanets.com/Webservice/";
@Component({
  templateUrl: 'app.html'
})
export class MyApp { 
  @ViewChild(Nav) nav: Nav;
   rootPage:any;
  public loader: any;
  userId:any;
  alldata:any = [];
  userData:any;
  pages: Array<{title: string, component: any, icon: any}>;
  user:any=[];
  total:any = [];
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public http: Http, private alertCtrl: AlertController,
  public toastCtrl: ToastController, public app: App, public loadingController: LoadingController,private authService :AuthServiceProvider,private ev: Events,    public storage: Storage,) {

       this.initializeApp();
    
      
    // used for an example of ngFor and navigation
    this.pages = [

      { title: 'Home',icon:'home', component: TabsPage },
      { title: 'My Account',icon:'person', component: MyAccountPage },
      { title: 'Change Password',icon:'lock', component: ChangePasswordPage },
      { title: 'About Us',icon:'information-circle', component: AboutUsPage },
      { title: 'Notification',icon:'notifications', component: NotificationsPage },
      { title: 'Pending Payment',icon:'card',component:PayPage},
      { title: 'Logout',icon:'power', component: null }
   ];
console.log(this.authService.data);
   this.ev.subscribe('payment success', name => {
     console.log('df',name);
    let userData=localStorage.getItem('userData');
    this.loadpaydata(JSON.parse(userData).id);
   })

  //  this.storage.get('user').then(user =>{
  //   console.log("dsg",this.authService.data);
  //   if(user){
  //     this.user = user;
  //     console.log("USER DETAILSSS  : ",user);
  //     console.log("userid",user[0].id);
    
  //       // console.log(val);
  //       if(user!=null){
  //         this.http.get(apiUrl+'addOnDetailById?userid='+user.id).map(res => res.json()).subscribe(result => {
  //           this.alldata = result.response;
          
  //         console.log("pending payment",result);
        
        
  //                },
  //              err => {
             
        
  //                console.log(err);
  //              });
  //         }
  //   } });

  }
  
loadpaydata(id){

  this.http.get(apiUrl+'addOnDetailById?userid='+id).map(res => res.json()).subscribe(result => {
    this.alldata = result.response;
  
  console.log("pending payment", this.alldata);


         },
       err => {
     

         console.log(err);
       });
}
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
     let userData=localStorage.getItem('userData');
      if (userData!=null && userData!='') {
		  
        this.showLoading();
// 
// this.loadpaydata(JSON.parse(userData).id);
           this.authService.getPlanStatus(JSON.parse(userData).id).then((response)=>{
            this.hideLoading();
            let result=response[0];
             if (response!=false) {
               if (result.is_active == 1)
                 this.rootPage = TabsPage; 
               else {
                 //~ if (JSON.parse(userData).cardnumber=='')
                   //~ this.rootPage = CardDetailsPage;
                 //~ else {
                   if (result.is_active == 0) 
                     this.showExpireAlert(); 

                   this.rootPage = MembershipPage
               }
             }else{
              // let userData=localStorage.getItem('userData');
              // this.loadpaydata(JSON.parse(userData).id);
				  this.rootPage = MembershipPage
			 }
             //~ else {
               //~ if (JSON.parse(userData).cardnumber=='')
                 //~ this.rootPage = CardDetailsPage;
               //~ else {
                 //~ if (result.is_active == 0)
                   //~ this.showExpireAlert();

                 //~ this.rootPage = MembershipPage
               //~ }
             //~ }
           },(error)=>{
             this.hideLoading();
             let confirm = this.alertCtrl.create({
               message: 'Some error occurs. Please check your internet. ',
					buttons: [
			{
			  text: 'ok',
			},
		]
});
confirm.present();
      });

      } else {
        this.rootPage = LoginPage
      }

    });
  }
  showLoading() {
    this.loader = this.loadingController.create({content: 'Please wait...'});
    this.loader.present();
  }

  hideLoading() {
    this.loader.dismiss()
  }
  showExpireAlert() {
    let alert = this.alertCtrl.create({
      title: 'Membership',
      subTitle: 'Your membership plan is expired please renew membership for further use.',
      buttons: ['Dismiss']
    });
    alert.present();
  }
  //~ openPage(page) {
    //~ // Reset the content nav to have just this page
    //~ // we wouldn't want the back button to show in this scenario
    //~ if (page.title == "LogOut") {
      //~ localStorage.clear();
      //~ this.nav.setRoot(LoginPage);

    //~ } else
      //~ this.nav.setRoot(page.component);
  //~ }
  
  openPage(page) {

    if(page.component) {
      if(page.title == 'My Account'){
        this.nav.push(page.component);
      }
      else{
        this.nav.setRoot(page.component);
      }
     
    } else {
      localStorage.clear();
      this.storage.clear();
       localStorage.setItem('userData','');
	  this.app.getRootNavs()[0].setRoot(LoginPage);
       
    }
   
  }

    
   //~ checkuserexit(){
	  //~ if(localStorage.getItem('userData')){
		
			//~ this.http.get('http://ondemandhome.betaplanets.com/Webservice/checkUserExist?userid='+JSON.parse(localStorage.getItem("userData"))[0].id).map(res => res.json()).subscribe(data => { 
				 //~ if(data == false){
					    //~ let toast = this.toastCtrl.create({
							//~ message: 'Admin has deleted your account.',
							//~ duration: 3000,
							//~ position: 'bottom'
						//~ });
						//~ toast.present(toast);
						//~ localStorage.setItem('emailuserData', '');		  
						//~ localStorage.setItem('userData', '');
						//~ this.rootPage = LoginPage;
				 //~ }
			//~ });
		//~ }
		//~ else{
			//~ this.rootPage = LoginPage;
	    //~ }
    //~ }
  }
