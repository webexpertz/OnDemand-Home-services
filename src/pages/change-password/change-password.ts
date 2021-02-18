import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import { Http } from '@angular/http';
import { MyAccountPage } from '../my-account/my-account';

let apiUrl="http://ondemandhome.betaplanets.com/Webservice/";

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {
	
  formgroup:FormGroup;
  password:AbstractControl;
  confirmPass:AbstractControl;
  responseData : any;
    public userId: any;
  public userData: any;
 
  constructor(public navCtrl: NavController, public navParams: NavParams, public formbuilder:FormBuilder, public http: Http, public toastCtrl: ToastController,) {
 	
	this.userData = JSON.parse(localStorage.getItem('userData'));
    this.userId = this.userData.id;

       this.formgroup = formbuilder.group({
        password:['',Validators.required],
        confirmPass: ['', Validators.required]
        },{validator: this.checkIfMatchingPasswords('password', 'confirmPass')

      });
      this.password = this.formgroup.controls['password'];
      this.confirmPass = this.formgroup.controls['confirmPass'];
}
checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
          return (group: FormGroup) => {
            let passwordInput = group.controls[passwordKey],
                passwordConfirmationInput = group.controls[passwordConfirmationKey];
            if (passwordInput.value !== passwordConfirmationInput.value) {
              return passwordConfirmationInput.setErrors({notEquivalent: true})
            }
            else {
                return passwordConfirmationInput.setErrors(null);
            }
          }
        }
        
 onChangePass(userData){	
	this.http.get(apiUrl+"setPassword?id="+this.userId+"&password="+userData.password).map(res => res.json()).subscribe(data => {
	  console.log("Change password Result",data);
   if(data==true){	
	   let toast = this.toastCtrl.create({
            message: 'Your Password Update Successfully.... ',
            duration: 1000,
            position: 'bottom'
        });
        toast.present(toast);
		this.navCtrl.setRoot(MyAccountPage);	
	   }else{
		    let toast = this.toastCtrl.create({
            message: 'Please Check Your Details. ',
            duration: 1000,
            position: 'bottom'
        });
        toast.present(toast);
	   }    
     
        
              },
     err => {
             console.log("Error",JSON.stringify(err));
     }
 ); 
 }

}
