import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {AlertController} from 'ionic-angular';
import {MembershipPage} from "../membership/membership";

/**
 * Generated class for the StandardPropertyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-standard-property',
  templateUrl: 'standard-property.html',
})
export class StandardPropertyPage {
  selectedId: number = -1;
  services: any = [];
  servicess: any = [];
  schemeId: any;
  public loader: any;
  selectSer : any ;
  mutliservice = [] ;
  mutiData = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingController: LoadingController, private toastCtrl: ToastController, private authService: AuthServiceProvider, private alertCtrl: AlertController) {

    this.schemeId=JSON.parse(localStorage.getItem('schemeId'))
    console.log("schemeId",this.schemeId);
    this.selectSer=this.navParams.get('SER');
    console.log("SER",this.selectSer);
      this.initServices(this.schemeId, 0);

    // if(this.selectSer == 1){
    //   this.initServices(this.schemeId, 0);
      this.selectedId = 0 ;
    // }else{
    //   this.initServices(this.schemeId, 1)
    // }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StandardPropertyPage');
  }


  initServices(schemeId,val) {
    this.showLoading();
    this.authService.getAllServicesbyId(schemeId,val).then((response) => {
      this.hideLoading();
      console.log("Services",response);
      this.services = response;
      this.mutiData = this.services;
      this.servicess = response;

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

  onItemClick(index: any, item,selectSer) {

      if(this.mutliservice.indexOf(index) == -1 ){
        this.mutliservice.push(index);
     console.log("mutliservice",this.mutliservice);

      }else{
        let i =this.mutliservice.indexOf(index);
        console.log("index",i);
        this.mutliservice.splice(i,1);
       console.log("Slice mutliservice",this.mutliservice);

      }
  
  }


  onMultiNextClick(){



    if(this.schemeId != 1){
        this.mutiData = this.services;
        this.navCtrl.push('ScheduleDatePage', {'OBJ': this.services,"muti":"true"});

    }else{
    this.mutiData=[];
    // console.log("package",this.services[this.selectedId]);
 if(this.services[this.selectedId].package_id == this.schemeId){
   if (this.selectedId != -1){

        for(let i=0;i<this.services.length;i++){
         var isfound=false;
        for(let j=0;j<this.mutliservice.length;j++){
         if( i == this.mutliservice[j]){
           //this.mutiData.push(this.services[i]);
           isfound=true;
         }   
        }
       if(!isfound){
         this.mutiData.push(this.services[i]);
       }
      // this.mutiData.push(this.services.id=); 
       }
       console.log("Multidata",this.mutiData);
     // for(let i=0;i<this.mutliservice.length;i++){
     //   this.mutiData.push(this.services[this.mutliservice[i]]);
     //   console.log("Multidata",this.mutiData);
     // }

       if(this.mutiData.length != 0){
        this.navCtrl.push('ScheduleDatePage', {'OBJ': this.mutiData,"muti":"true"});

       }else{
          this.showalert();
       }

     //  console.log("Selected Data",this.services[this.selectedId]);
   }
}
else{
  this.onPackage();
} 
    }
  
}

showalert() {
  let confirm = this.alertCtrl.create({
message: 'Please Select Any Service..',
buttons: [
{
 text: 'ok',
 handler: () => {    
     console.log("select Service");
 }
}
]
});
confirm.present(); 
 
}



onPackage() {
  let confirm = this.alertCtrl.create({
message: 'Are you sure you want to upgrade your package.',
buttons: [
{
 text: 'ok',
 handler: () => {    
     this.navCtrl.push(MembershipPage);
 }
},
{
 text: 'Cancel',
 handler: () => {
 console.log('gree clicked');
 }
}
]
});
confirm.present(); 
 
}



  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Other Service',
      inputs: [
        {
          name: 'service',
          placeholder: 'Service'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Add',
          handler: data => {
            if (data.service != '' && data.service.length>4) {
              // logged in!
              let obj = {
                services: data.service
              };
              this.navCtrl.push('ScheduleDatePage', {'OBJ': obj})
            } else {
              // invalid login
              this.showToast("Please enter valid service");
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }


}
