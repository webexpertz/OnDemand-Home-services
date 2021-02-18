import {Component} from '@angular/core';
import {App, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {Stripe} from "@ionic-native/stripe";
import {HomePage} from "../home/home";
import { Http } from '@angular/http';

/**
 * Generated class for the CardDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 declare var cordova: any;
let apiUrl="http://ondemandhome.betaplanets.com/Webservice/";

@IonicPage()
@Component({
  selector: 'page-card-details',
  templateUrl: 'card-details.html',
})
export class CardDetailsPage {
	
  cardname: AbstractControl;
  cardno: AbstractControl;
  cardexpmonth: AbstractControl;
  cardcvc: AbstractControl;
  cardexpyear: AbstractControl;
  formgroup: FormGroup;
  public loader: any;
  userId;
  userData;
  getPlanamount: any;
  getPlan: any;
  selectedPackage: any;
  responseData: any;
  stripecustId: any;
  
 constructor(public navCtrl: NavController, public app: App, public navParams: NavParams, public formbuilder: FormBuilder, private authService: AuthServiceProvider,
  private toastCtrl: ToastController, public loadingController: LoadingController, private strip: Stripe, public http: Http) {
    this.initFormGroup();
   
      this.userData = JSON.parse(localStorage.getItem('userData'));
      console.log("user Data",this.userData.username);
      this.userId = this.userData.id;
	  this.getPlanamount = this.navParams.get('amount');
	  this.getPlan = this.navParams.get('plan');
    this.selectedPackage = this.navParams.get('selectedPackage');
    console.log("selectedPackage",this.getPlan);
	  
		this.http.get(apiUrl+'customerpackage?userid='+this.userId).map(res => res.json()).subscribe(data => {

		if(data){			 
		this.stripecustId= data[0].customerid;      
		}
		},
		err => {
		console.log(err);
		}); 

  }

  initFormGroup() {
    this.formgroup = this.formbuilder.group({
      cardname: ['', Validators.required],
      cardno: ['', Validators.compose([Validators.pattern('[0-9]{16}'), Validators.required])],
      cardexpmonth: ['', Validators.required],
      cardexpyear: ['', Validators.required],
      cardcvc: ['', Validators.compose([Validators.pattern('[0-9]{3}'), Validators.required])]
    });
    this.cardname = this.formgroup.controls['cardname'];
    this.cardno = this.formgroup.controls['cardno'];
    this.cardexpmonth = this.formgroup.controls['cardexpmonth'];
    this.cardexpyear = this.formgroup.controls['cardexpyear'];
    this.cardcvc = this.formgroup.controls['cardcvc'];

  }

  //~ updateCardDetail(data) {
    //~ this.showLoading();
    //~ this.authProvider.updateCardDetails(data).then((data) => {
        //~ this.hideLoading();
        //~ if(data)
        //~ localStorage.setItem("isCardSaved", "saved");
      //~ this.navCtrl.push(MembershipPage,{'cardDetails':this.getCardDetails(data)});
      //~ this.navCtrl.setRoot(MembershipPage);
      //~ }, (error) => {
        //~ this.hideLoading()
      //~ }
    //~ )
  //~ }

  makePayment(cardDetails) {
    const card = {
      number: cardDetails.cardno,
      expMonth: cardDetails.cardexpmonth,
      expYear: cardDetails.cardexpyear,
      cvc: cardDetails.cardcvc
    };
    //~ alert(JSON.stringify(card))
    this.showLoading();
    this.strip.setPublishableKey('pk_test_6C2zhCPDkgYTCvlU96n2WcIw');
    this.strip.createCardToken(card)
      .then(token => {
         //~ alert("Payment success " + token.id);
           this.authService.makePayement(this.getPaymentData(token.id)).then(
             (response)=>{
              //  this.responseData = response;
               this.showToast("Thank You, Your payment is successful.");
               this.hideLoading();
               localStorage.setItem('isMember', 'member');
               localStorage.setItem('schemeId', this.getPlan.id);
               console.log("Payment schemeId",this.getPlan.id);
               this.navCtrl.push(HomePage);
               this.app.getRootNavs()[0].setRoot(HomePage);

			
             },(error)=>{
               this.hideLoading();
                console.log("Payment error "+ JSON.stringify(error));
               this.showToast("Some error occur in payment.");

             })
      }
      )
      .catch(error => {
        console.error(error);
        this.hideLoading();
        alert("Payment error " + JSON.stringify(error))
      });
  }
    getPaymentData(stripTokenId) {

  //alert("month end "+moment().add(1,'month').toDate());
   return "userid=" + this.userId +
      "&email=" + this.userData.email +
      "&username=" + this.userData.username +
      "&schemeid=" + this.getPlan.id +
      "&schemeplan=" + this.selectedPackage +
      "&totalamount=" + this.getPlanamount+
      "&mobile=" + this.userData.mobile +
      "&address=" + this.userData.address+
      "&name=" + this.userData.cardname+
      "&stripeToken=" + stripTokenId;
  }

  showLoading() {
    this.loader = this.loadingController.create({content: 'Please wait...'});
    this.loader.present();

  }

  hideLoading() {
    this.loader.dismiss()
  }

  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 1500,
      position: 'bottom'
    });
    toast.present(toast);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardDetailsPage');
  }
  

  //~ onSaveClick(value: any) {
    //~ const data = "userid=" + this.userId +
      //~ "&cardname=" + value.cardname +
      //~ "&cardtype=" + value.cardtype +
      //~ "&cardnumber=" + value.cardno +
      //~ "&cardexpmonth=" + value.cardexpmonth +
      //~ "&cardexpyear=" + value.cardexpyear+
      //~ "&cvc=" + value.cardcvc;
    //~ this.updateCardDetail(data)
  //~ }

  //~ private getCardDetails(data) {
    //~ return {
      //~ cardexpmonth: data.cardexpmonth,
      //~ cardexpyear: data.cardexpyear,
      //~ cardtype: data.cardtype,
      //~ cardname: data.cardname,
      //~ cvc: data.cardcvc

    //~ }
  //~ }
}
