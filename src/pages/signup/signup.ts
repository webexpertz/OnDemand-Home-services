import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, NavParams, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import {FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import { TermServicesPage } from '../term-services/term-services';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formgroup:FormGroup;
  username:AbstractControl;
  firstname:AbstractControl;
  lastname:AbstractControl;
  email:AbstractControl;
  contact:AbstractControl;
  password:AbstractControl;
  responseData : any;
  findios : any;
  address:AbstractControl;
  state:AbstractControl;
  apt:AbstractControl;
  city:AbstractControl;
  zip:AbstractControl;
  isMsg: any;
  ischeck = true;
  confirmcheckbox:any;
  constructor(public navCtrl: NavController,public authService: AuthServiceProvider,public toastCtrl: ToastController, public navParams: NavParams, public platform: Platform,
   public formbuilder:FormBuilder) {
   
     platform.ready().then(() => {
        if (this.platform.is('ios')) {        
             this.findios='isios';
         }else {
            this.findios='notios';
         }
     });
     
   this.formgroup = formbuilder.group({
        username:['',Validators.compose([Validators.maxLength(10),Validators.required])],
        firstname:['',Validators.required],
        lastname:['',Validators.required],
        email:['',Validators.compose([Validators.pattern('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}'), Validators.required])],
        contact:['',Validators.compose([Validators.pattern('[0-9( )-]*'), Validators.required])],
        password:['',Validators.required],
        address:['',Validators.required],
        apt:[''],
        city:['',Validators.required],
        state:['',Validators.required],
        // confirmcheckbox:['',Validators.required],
        zip:['',Validators.compose([Validators.pattern('[0-9]{5}'), Validators.required])],
      });
    
      this.username = this.formgroup.controls['username'];
      this.firstname = this.formgroup.controls['firstname'];
      this.lastname = this.formgroup.controls['lastname'];
      this.email = this.formgroup.controls['email'];
      this.contact = this.formgroup.controls['contact'];
      this.password = this.formgroup.controls['password'];
      this.address = this.formgroup.controls['address'];
      this.apt = this.formgroup.controls['apt'];
      this.city = this.formgroup.controls['city'];
      this.state = this.formgroup.controls['state'];
      this.zip = this.formgroup.controls['zip'];  
      // this.confirmcheckbox = this.formgroup.controls['confirmcheckbox'];  
   
  }
  get usernames() {
    return this.formgroup.get('username');
 }
   checkCheckbox(c: AbstractControl){
    if(c.get('confirmCheckbox').value == false){
        return false;
    }else return true;
}
  signup(userData){
      this.authService.signupData(userData).then((result) => {
      this.responseData = result;
      console.log("resulty",this.responseData);
      if(this.responseData==true){
		  let toast = this.toastCtrl.create({
			message: 'Thank you, Your registration is completed.',
			duration: 1000,
			position: 'bottom'
			});
			toast.present(toast); 
      this.navCtrl.push(LoginPage);
      }
      else if(this.responseData==false)
		  {
			  let toast = this.toastCtrl.create({
            message: 'Username or Contact Already Exists ',
            duration: 1000,
            position: 'bottom'
        });
        toast.present(toast);
    }else
      {
			  let toast = this.toastCtrl.create({
            message: 'Sorry Try Again!',
            duration: 1000,
            position: 'bottom'
        });
        toast.present(toast);
    }		 
    }, (err) => {
      // Error log
    })
  }

loginpage() {

	   this.navCtrl.push(LoginPage);   
   }
   
 onTerm(){
	  this.navCtrl.push(TermServicesPage);   
   }
   onClickterm(isChecked) {
     console.log(isChecked);
    //  if(val){
      if (isChecked == false) {
        this.ischeck = false;
        this.isMsg = "Please check that you agree to our terms & conditions";
      }if (isChecked == true) {
        this.ischeck = true;
        this.isMsg = "";
      }
    //  }
  
  }

  showMsg() {
    let toast = this.toastCtrl.create({
      message: 'Please check terms & conditions to complete sign up.',
      duration: 3000,
      position: 'bottom'
    });
    toast.present(toast);
  }
}
