import {Component,Pipe,PipeTransform} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {AlertController} from 'ionic-angular';
import {MembershipPage} from "../membership/membership";

/**
 * Generated class for the SpecificRepairPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-specific-repair',
  templateUrl: 'specific-repair.html',
})
export class SpecificRepairPage {

  selectedId: number = -1;
  services: any = [];
  servicess: any = [];
  schemeId: any;
  public loader: any;
  selectSer : any ;
  mutliservice = [] ;
  mutiData = [];
  otherselect :boolean = false; 
  primarycl ="success";
  secondarycl ="primary";
  othervalue:string;

  general :boolean = false; 
  generalvalue:string;

  rta :boolean = false; 
  rtavalue:string;

  basic :boolean = false; 
  basicvalue:string;

  gutter :boolean = false; 
  guttervalue:string;

  picturenumber :boolean = false; 
  picturenumbervalue:string;

  picturesize :boolean = false; 
  picturesizevalue:string;

  tv :boolean = false; 
  tvvalue = "yes";
  tvsvalue = "yes";
   tvs:boolean =false;
  tvsize:string;
  tvsizes:string;
 gpackage:any;
spackage:any;
ppackage:any;

  description = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingController: LoadingController, private toastCtrl: ToastController, private authService: AuthServiceProvider, private alertCtrl: AlertController) {
     this.schemeId=JSON.parse(localStorage.getItem('schemeId'))
    // this.schemeId='3';
    console.log("schemeId",this.schemeId);
    this.selectSer=this.navParams.get('SER');
    console.log("SER",this.selectSer);
      this.initServices(this.schemeId, 1);

      this.authService.getRequestStatus().then((response) => {              
                          
        console.log("response",response);
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpecificRepairPage');
  }

  initServices(schemeId,val) {
    this.showLoading();
    this.authService.getAllServicesbyId(schemeId,val).then((response) => {
      this.hideLoading();
      console.log("Services",response);
      this.services = response;
      this.servicess = response;

   
      this.servicess.forEach(item=>{
   if(item.package_id =='1'){
this.spackage = item.type;
console.log(this.spackage);
   }
   if(item.package_id =='2'){
    this.gpackage = item.type;
       }
       if(item.package_id =='3'){
        this.ppackage = item.type;
           }
      })
      // if( this.schemeId == '3'){
      //   this.services.forEach(item => {
      //     var value = item.id;
      //   //  console.log(value)
      //    const shouldShow = value.toLowerCase().indexOf('23') > -1;
      //    if(shouldShow == true){
      
      //     item.services ="Mount TV's over 50" ;
  
      //    }
      //   });
      //   console.log("item",this.services);
      // }

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

  onItemClick(index: any, item,selectSer,package_id) {
console.log(package_id);
      if(item.id == 35){
        this.otherselect =  !this.otherselect;
      }
      if(item.id == 34){
        this.general =  !this.general;
      }
      if(item.id == 28){
        this.rta =  !this.rta;
      }
      if(item.id == 30){
        this.basic =  !this.basic;
      }

      if(item.id == 25){
        this.gutter =  !this.gutter;
      }

      if(item.id == 23){
        this.tv =  !this.tv;
      }
      if(item.id == 33){
        this.tvs =  !this.tvs;
      }
      if(item.id == 27){
        
        this.picturesize =  !this.picturesize;
        this.picturenumber =  !this.picturenumber;

      }


      if(this.mutliservice.indexOf(index) == -1 ){
        this.mutliservice.push(index);
     console.log("mutliservice",item);
    

      }else{
        let i =this.mutliservice.indexOf(index);
        console.log("index",i);
        this.mutliservice.splice(i,1);
       console.log("Slice mutliservice",this.mutliservice);

      }
  }
  upgradePackage(id,item,selectSer,package_id){
  
    if(package_id > this.schemeId){
      console.log("service value is greater");
      this.onPackage();
    }else{
      console.log("service value is less");
      this.onItemClick(id,item,selectSer,package_id);
      
    }

  }
  inputValue(event){
  console.log(event)
  }
  onMultiNextClick(){
    console.log("tv size",this.tvsize);
     console.log("this.other valur",this.othervalue)
    this.mutiData=[];
    // console.log("package",this.services[this.selectedId]);
 if(this.services[0].package_id <= this.schemeId){


        for(let i=0;i<this.services.length;i++){
         var isfound=false;
        for(let j=0;j<this.mutliservice.length;j++){
         if( i == this.mutliservice[j]){
            if(this.services[i].id==35 && this.othervalue && (/\S/.test(this.othervalue))){
            console.log('34 found')
            console.log('34 found gfg' ,this.services[i].services)
            let otherServiceArray=this.services[i];
            // otherServiceArray.services=otherServiceArray.services+"("+this.othervalue+")";
            console.log('34 found gfg' ,otherServiceArray)
             this.mutiData.push({ id: "34", package_id: "3", services:otherServiceArray.services+"("+this.othervalue+")"})
            // otherServiceArray=null
            }else if(this.services[i].id==34 && this.general ){

              this.mutiData.push({ id: this.services[i].id, package_id: this.services[i].package_id, services:this.services[i].services,description:this.generalvalue});
              this.description.push({ id: this.services[i].id,description : this.generalvalue});

            }else if(this.services[i].id==28 && this.rta ){

              this.mutiData.push({ id: this.services[i].id, package_id: this.services[i].package_id, services:this.services[i].services,description:this.rtavalue});
              this.description.push({ id: this.services[i].id,description : this.rtavalue});

            }else if(this.services[i].id==30 && this.basic ){

              this.mutiData.push({ id: this.services[i].id, package_id: this.services[i].package_id, services:this.services[i].services,description:this.basicvalue});
              this.description.push({ id: this.services[i].id,description : this.basicvalue});

            }else if(this.services[i].id==25 && this.gutter ){

              this.mutiData.push({ id: this.services[i].id, package_id: this.services[i].package_id, services:this.services[i].services,description:this.guttervalue});
              this.description.push({ id: this.services[i].id,description : this.guttervalue});

            }else if(this.services[i].id==27 && (this.picturenumber || this.picturesize)){

              this.mutiData.push({ id: this.services[i].id, package_id: this.services[i].package_id, services:this.services[i].services,description:this.picturenumbervalue+"-"+this.picturesizevalue});
              this.description.push({ id: this.services[i].id,description : this.picturenumbervalue+"-"+this.picturesizevalue});

            }else if(this.services[i].id==23 && this.tv){

              this.mutiData.push({ id: this.services[i].id, package_id: this.services[i].package_id, services:this.services[i].services,description:this.tvvalue+ '-' + this.tvsize});
              this.description.push({ id: this.services[i].id,description : this.tvvalue + '-' + this.tvsize});

            }else if(this.services[i].id==33 && this.tvs){

              this.mutiData.push({ id: this.services[i].id, package_id: this.services[i].package_id, services:this.services[i].services,description:this.tvsvalue+ '-' + this.tvsizes});
              this.description.push({ id: this.services[i].id,description : this.tvsvalue + '-' + this.tvsizes});

            }
            else{
              this.mutiData.push(this.services[i]);
            }

            








           
           console.log("all service",this.services[i]);
           //console.log("services",this.services[i].services.push("othersection"));
           isfound=true;
         }   
        }
       if(!isfound){
        isfound=true;

        //  this.mutiData.push(this.services[i]);
       }
      // this.mutiData.push(this.services.id=); 
       }
       console.log("Multidata",this.mutiData);
     // for(let i=0;i<this.mutliservice.length;i++){
     //   this.mutiData.push(this.services[this.mutliservice[i]]);
     //   console.log("Multidata",this.mutiData);
     // }
      this.navCtrl.push('ScheduleDatePage', {'OBJ': this.mutiData,"muti":"true",'des':this.description});
     //  console.log("Selected Data",this.services[this.selectedId]);

}
else{
  this.onPackage();
} 
    
}

mountvalue(val){
  this.tvvalue = val ;
}
mountsvalue(val){
  this.tvsvalue = val ;
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

//   validateTvmount(value,id){
// console.log();
// if(id == '23' && this.schemeId == '3' ){
//  return "Mount TV's over 50";
// }
// else{
//   return value ;
// }
//   }
package(){}

}
