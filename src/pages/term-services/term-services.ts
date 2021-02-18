import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
/**
 * Generated class for the TermServicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-term-services',
  templateUrl: 'term-services.html',
})
export class TermServicesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private iab: InAppBrowser) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TermServicesPage');
  }
  goToOndemand(){
    this.iab.create('mailto:Privacy@QuestDiagnostics.com');
  }
  gotoTools(){
    this.iab.create('https://tools.google.com/dlpage/gaoptout');
  }
  gotogoogle(){
    this.iab.create('https://www.google.com/policies/privacy/partners/');
  }
  gotoAnswer(){
    this.iab.create('https://support.google.com/ads/answer/2662922?hl=en');
  }
}
