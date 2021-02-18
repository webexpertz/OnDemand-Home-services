import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {FormBuilder, FormGroup, Validators, AbstractControl} from "@angular/forms";

/**
 * Generated class for the EditAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-account',
  templateUrl: 'edit-account.html',
})
export class EditAccountPage {
  userData: any = {};
  private isDisabled: boolean = false;
  editBtnTitle: String = "Edit My Account";
  formgroup: FormGroup;
  isAddressSame: boolean=false;
  isChecked: boolean=false;
  public loader :any;
  firstname:AbstractControl;
  lastname:AbstractControl;
  email:AbstractControl;
  mobile:AbstractControl;
  altermobile:AbstractControl;

  additionalfirstname:AbstractControl;
  additionallastname:AbstractControl;
  additionalemail:AbstractControl;
  additionalmobile:AbstractControl;
  additionalaltermobile:AbstractControl;

  password:AbstractControl;
  address:AbstractControl;
  state:AbstractControl;
  apt:AbstractControl;
  city:AbstractControl;
  zip:AbstractControl;
  billingaddresss:AbstractControl;
  billingstate:AbstractControl;
  billingapt:AbstractControl;
  billingcity:AbstractControl;
  billingzip:AbstractControl;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public authService: AuthServiceProvider, public formbuilder: FormBuilder, public navParams: NavParams,public loadingController: LoadingController) {
    this.initFormGroup();
    this.initUserInfo();
	
  } 

  initUserInfo() {
    this.userData =this.navParams.get("USERDATA") ;
    this.isChecked = this.userData.isbillingsame != 0;
    this.isAddressSame=this.isChecked;
    this.formgroup.get("state").setValue(this.userData.state);
    this.formgroup.get("billingstate").setValue(this.userData.billingstate);
  }

  initFormGroup() {
    this.formgroup = this.formbuilder.group({

        firstname:['',Validators.required],
        lastname:['',Validators.required],
        email:['',Validators.compose([Validators.pattern('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}'), Validators.required])],
        mobile:['', Validators.compose([Validators.pattern('[0-9( )-]*'), Validators.required])],
        altermobile:[''],

        // additionalfirstname:['',Validators.required],
        // additionallastname:['',Validators.required],
        // additionalemail:['',Validators.compose([Validators.pattern('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}'), Validators.required])],
        // additionalmobile:['', Validators.compose([Validators.pattern('[0-9( )-]*'), Validators.required])],
        // additionalaltermobile:[''],

        address:['',Validators.required],
        apt:[''],
        city:['',Validators.required],
        state:['',Validators.required],
        zip:['',Validators.compose([Validators.pattern('[0-9]{5}'), Validators.required])],
        billingaddresss:[''],
        billingapt:[''],
        billingcity:[''],
        billingstate:[''],
        billingzip:['',Validators.compose([Validators.pattern('[0-9]{5}')])],

    });
    
      this.firstname = this.formgroup.controls['firstname'];
      this.lastname = this.formgroup.controls['lastname'];
      this.email = this.formgroup.controls['email'];
      this.mobile = this.formgroup.controls['mobile'];
      this.altermobile = this.formgroup.controls['altermobile'];


      // this.additionalfirstname = this.formgroup.controls['additionalfirstname'];
      // this.additionallastname = this.formgroup.controls['additionallastname'];
      // this.additionalemail = this.formgroup.controls['additionalemail'];
      // this.additionalmobile = this.formgroup.controls['additionalmobile'];
      // this.additionalaltermobile = this.formgroup.controls['additionalaltermobile'];

      this.address = this.formgroup.controls['address'];
      this.apt = this.formgroup.controls['apt'];
      this.city = this.formgroup.controls['city'];
      this.state = this.formgroup.controls['state'];
      this.zip = this.formgroup.controls['zip'];  
      this.billingaddresss = this.formgroup.controls['billingaddresss'];
      this.billingapt = this.formgroup.controls['billingapt'];
      this.billingcity = this.formgroup.controls['billingcity'];
      this.billingstate = this.formgroup.controls['billingstate'];
      this.billingzip = this.formgroup.controls['billingzip']; 
      
      console.log("  this.formgroup",  this.formgroup);
  
  }

  showLoading() {
    this.loader = this.loadingController.create({content: 'Loading...'});
    this.loader.present();

  }

  hideLoading() {
    this.loader.dismiss()
  }

  onEditAccountClick(accountInfo) {
    console.log("onEditAccountClick " + this.isDisabled);
    console.log("update data called");
    console.log("Data",accountInfo);
    this.updateUserData(accountInfo)


  }

  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 1000,
      position: 'bottom'
    });
    toast.present(toast);
  }

  
  updateUserData(accountInfo) {

    this.showLoading();
    console.log("update data id " + this.userData.id + " account in " + accountInfo);
    let endApi = "id=" + this.userData.id +
      "&firstname=" + accountInfo.firstname +
      "&lastname=" + accountInfo.lastname +
      "&email=" + accountInfo.email +
      "&mobile=" + accountInfo.mobile +
      "&alternate_phone=" + accountInfo.altermobile +

      "&additionalfirstname=" + accountInfo.additionalfirstname +
      "&additionallastname=" + accountInfo.additionallastname +
      "&additionalemail=" + accountInfo.additionalemail +
      "&additionalmobile=" + accountInfo.additionalmobile +
      "&additionalalternate_phone=" + accountInfo.additionalaltermobile +

      "&address=" + accountInfo.address +
      "&apt=" + accountInfo.apt +
      "&city=" + accountInfo.city +
      "&isbillingsame=" + this.getValueForAddress() +
      this.getBillingValues(this.getValueForAddress(), accountInfo) +
      "&state=" + accountInfo.state +
      "&zip=" + accountInfo.zip ;

    this.authService.updateData(endApi).then((response) => {
      this.showToast("Successfully Updated");
      this.hideLoading();
      this.navCtrl.pop()
    }, (error) => {
      this.hideLoading();
      this.showToast("Some error occur.")
    })
  }

  getBillingValues(isSame, accountInfo) {
    if (isSame) {
      return "&billingcity=" + accountInfo.city +
        "&billingaddresss=" + accountInfo.address +
        "&billingapt=" + accountInfo.apt +
        "&billingzip=" + accountInfo.zip +
        "&billingstate=" + accountInfo.state;
    } else {
      return "&billingcity=" + accountInfo.billingcity +
        "&billingaddresss=" + accountInfo.billingaddresss +
        "&billingapt=" + accountInfo.billingapt +
        "&billingzip=" + accountInfo.billingzip +
        "&billingstate=" + accountInfo.billingstate;
    }
  }

 getValueForAddress(){
    if (this.isAddressSame) return 1;
   else return 0
 }

  updateAddressCheckBox(isChecked) {
    console.log('updateAddressCheckBox new state:' );
    this.isAddressSame=isChecked;
  }
}

