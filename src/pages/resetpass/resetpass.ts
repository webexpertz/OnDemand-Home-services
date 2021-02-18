import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, LoadingController, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login'; 
import { AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import {FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import { Http } from '@angular/http';

let apiUrl="http://ondemandhome.betaplanets.com/Webservice/";

/**
 * Generated class for the ResetpassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resetpass',
  templateUrl: 'resetpass.html',
})
export class ResetpassPage {
formgroup:FormGroup;
   email:AbstractControl; 
   findios : any;  
  constructor(public navCtrl: NavController,public authService: AuthServiceProvider,public toastCtrl: ToastController, public platform: Platform,
   public alertCtrl: AlertController,public http: Http,public formbuilder:FormBuilder, public loadingCtrl: LoadingController) {
   
   platform.ready().then(() => {
        if (this.platform.is('ios')) {        
             this.findios='isios';
         }else {
            this.findios='notios';
         }
     });   
     this.formgroup = formbuilder.group({
        email:['',Validators.compose([Validators.pattern('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}'), Validators.required])]
      });
      this.email = this.formgroup.controls['email'];   
  }
 forget(userData){  
	let loading = this.loadingCtrl.create({
		   content: 'Please wait...'
	 });
	loading.present();
	this.http.get(apiUrl+'forgetoldpassword?email='+userData.email).map(res => res.json()).subscribe(data => {
       if(data){	  
		  let toast = this.toastCtrl.create({
            message: 'Please Check Your Email. ',
            duration: 1000,
            position: 'bottom'
        });
        this.http.get(apiUrl+'forgetSendEmail?id='+data[0].id+'&username='+data[0].username+'&email='+data[0].email).subscribe(result => {
		
		 });	
        loading.dismiss();
        toast.present(toast);
        
        setTimeout(() => {			
			this.navCtrl.push(LoginPage);			
		},2000);
	   }else{
		    let toast = this.toastCtrl.create({
            message: 'Email Id Not Exists. ',
            duration: 1000,
            position: 'bottom'
        });
        loading.dismiss();
        toast.present(toast);
	   }    
    },);
  }
  
  loginpage() {
	   this.navCtrl.push(LoginPage);	   
   }
}

