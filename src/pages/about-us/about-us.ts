import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

let apiUrl="http://ondemandhome.betaplanets.com/Webservice/";

/**
 * Generated class for the AboutUsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about-us',
  templateUrl: 'about-us.html',
})
export class AboutUsPage {
	
  abouttext:any;
  
  urlToLoad =  "http://ondemandhome.betaplanets.com/welcome";
  safeURL : any;
	
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,public sanitizer:DomSanitizer) {
  
  	this.http.get(apiUrl+'OnDemandAbout').map(res => res.json()).subscribe(data => {
  
        console.log("DATA",data);


	this.abouttext =data;
})
this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlToLoad);

  
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad AboutUsPage');
  }

}
