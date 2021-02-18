import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController ,LoadingController} from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";


/**
 * Generated class for the PackageInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-package-info',
  templateUrl: 'package-info.html',
})
export class PackageInfoPage {

  schemeId : any ;
  services: any = [];
  public loader: any;
  data : any ;

  constructor(public navCtrl: NavController, public navParams: NavParams,private authService: AuthServiceProvider, private toastCtrl: ToastController,private loadingController: LoadingController) {
    this.schemeId=JSON.parse(localStorage.getItem('schemeId'))
    console.log("schemeId",this.schemeId);
    this.initServices()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PackageInfoPage');
  }
  initServices() {
    this.showLoading();
    this.authService.getAllServicesbyId(this.schemeId,1).then((response) => {
      this.hideLoading();
      console.log("Services",response);
      this.data =response ;
      this.services = this.data.filter((ele)=>{
          return  ele.package_id == this.schemeId
      });
    }, (error) => {
      this.hideLoading();
      this.showToast("Some Error Occur.")
    })
  }
  showLoading() {
    this.loader = this.loadingController.create({content: 'Loading...'});
    this.loader.present();

  }

  hideLoading() {
    this.loader.dismiss()
  }
  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 1000,
      position: 'bottom'
    });
    toast.present(toast);
  }
}
