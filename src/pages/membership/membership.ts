import {Component} from '@angular/core';
import {App, IonicPage, LoadingController, NavController, NavParams, ToastController,ModalController, MenuController} from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {Stripe} from "@ionic-native/stripe";
import * as moment from 'moment';
import {HomePage} from "../home/home";

import{ServiceModalComponent} from "../../components/service-modal/service-modal"

@IonicPage()
@Component({
  selector: 'page-membership',
  templateUrl: 'membership.html',
})


export class MembershipPage {

  private selectedPackage = 'monthly';
  private plansWithPackage: any = [];
  public loader: any;
  public cardDetails: any;
  public userId: any;
  public userData: any;
  public selectedPlan: any;
  responseData: any;

  constructor(private strip: Stripe,  public app: App, public navCtrl: NavController, public navParams: NavParams, private authService: AuthServiceProvider, private loadingController: LoadingController, private toastCtrl: ToastController,public modalCtrl: ModalController, public menuCtrl: MenuController) {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.userId = this.userData.id;
    this.initPlans();
  }

  ionViewWillEnter(){
    this.menuCtrl.enable(true);
  }

  initPlans() {
    this.showLoading();
    this.authService.getAllPlans().then((response) => {
      this.plansWithPackage = response;
      //~ this.authService.getCardDetails(this.userId).then((response) => {
        //~ this.cardDetails = response[0];
        this.hideLoading();
      //~ }, (error) => {
        //~ this.hideLoading();
        //~ this.showToast("Some Error Occur.")
      //~ })
    }, (error) => {
      this.hideLoading();
      this.showToast("Some Error Occur.")
    })
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
    this.loader = this.loadingController.create({content: 'Please Wait...'});
    this.loader.present();
  }

  hideLoading() {
    this.loader.dismiss()
  }

  //~ makePayment(cardDetails) {
    //~ const card = {
      //~ number: cardDetails.cardnumber,
      //~ expMonth: cardDetails.cardexpmonth,
      //~ expYear: cardDetails.cardexpyear,
      //~ cvc: cardDetails.cvc
    //~ };
    //~ this.showLoading();
    //~ this.strip.setPublishableKey('pk_test_6C2zhCPDkgYTCvlU96n2WcIw');
    //~ this.strip.createCardToken(card)
      //~ .then(token => {
        //~ //  alert("Payment success " + token.id);
           //~ this.authService.makePayement(this.getPaymentData(token.id)).then(
             //~ (response)=>{
               //~ this.showToast("Thank You, Your payment is successful.");
               //~ this.hideLoading();
               //~ this.navCtrl.push(HomePage);
               //~ this.app.getRootNavs()[0].setRoot(HomePage);
               //~ localStorage.setItem('isMember', 'member');
               //~ localStorage.setItem('schemeId', this.responseData[0].schemeid);
			
             //~ },(error)=>{
               //~ this.hideLoading();
                //~ console.log("Payment error "+ JSON.stringify(error));
               //~ this.showToast("Some error occur in payment.");

             //~ })
      //~ }
      //~ )
      //~ .catch(error => {
        //~ console.error(error);
        //~ this.hideLoading();
        //~ alert("Payment error " + JSON.stringify(error))
      //~ });
  //~ }

  //~ getPaymentData(stripTokenId) {

  //~ //alert("month end "+moment().add(1,'month').toDate());
   //~ return "userid=" + this.userId +
      //~ "&email=" + this.userData.email +
      //~ "&username=" + "username" +
      //~ "&schemeid=" + this.selectedPlan.id +
      //~ "&schemeplan=" + this.selectedPackage +
      //~ "&totalamount=" + this.getSelectedPlanAmount()+
      //~ "&mobile=" + this.userData.mobile +
      //~ "&address=" + this.userData.address+
      //~ "&name=" + this.userData.cardname+
      //~ "&stripeToken=" + stripTokenId;
  //~ }

  getEndDateOFPlan(){
    if (this.selectedPackage == 'monthly')
      return moment().add(1,'month');
    else return moment().add(1,'year');
  }

  getSelectedPlanAmount() {
    if (this.selectedPackage == 'monthly')
      return this.selectedPlan.monthfee;
    else return this.selectedPlan.annuallfee
  }
  onPlanClick(value) {
    this.selectedPackage = value
  }

  onPaymentClick(plan,amount) {
console.log(plan);
    // let profileModal = this.modalCtrl.create(ServiceModalComponent,
    //    { planid: plan.id }
    //    );
    // profileModal.present();
    this.selectedPlan = plan;
    this.navCtrl.push(ServiceModalComponent, { planid: plan.id ,plan:plan,amount:amount,selectedPackage:this.selectedPackage})

    //  this.navCtrl.push(CardDetailsPage,{plan:plan,amount:amount,selectedPackage:this.selectedPackage});
    
    //~ this.makePayment(this.cardDetails)
  }
}
