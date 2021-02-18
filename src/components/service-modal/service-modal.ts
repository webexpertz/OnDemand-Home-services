import { Component } from '@angular/core';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import { ModalController, NavParams ,NavController} from 'ionic-angular';
import {CardDetailsPage} from "../../pages/card-details/card-details"

/**
 * Generated class for the ServiceModalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'service-modal',
  templateUrl: 'service-modal.html'
})
export class ServiceModalComponent {

  text: string;
planid:any;
services:any;
packagename:any;
plan:any;
amount:any;
selectedPackage:any;

  constructor(public authService:AuthServiceProvider, public navParams: NavParams,public modalController: ModalController, public navCtrl: NavController) {
    this.planid = this.navParams.get("planid");
    this.plan = this.navParams.get("plan");
    this.amount = this.navParams.get("amount");
    this.selectedPackage = this.navParams.get("selectedPackage");
    this.authService.getAllServicesbyId( this.planid ,0).then((response) => {
   this.services = response;
   this.packagename = this.services[0].type;
      console.log("rres",response);
      console.log("   this.planid ",    this.services[0].type );
    });
  }
  dismissModal(){
    // this.modalController.dismiss();
  }
  gotocard(){
   this.navCtrl.push(CardDetailsPage,{plan:this.plan,amount:this.amount,selectedPackage:this.selectedPackage});
  }
}
