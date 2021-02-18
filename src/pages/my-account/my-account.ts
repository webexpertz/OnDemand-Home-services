import {Component} from '@angular/core';
import {IonicPage, NavController, App, NavParams, ActionSheetController, ToastController, Platform, LoadingController, Loading, AlertController} from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import { EditAccountPage } from '../edit-account/edit-account';
import { PackageInfoPage } from '../package-info/package-info';
import { ChangePasswordPage } from '../change-password/change-password';
import {MembershipPage} from "../membership/membership";

import { Http } from '@angular/http';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { normalizeURL } from 'ionic-angular';

declare var cordova: any;
let apiUrl="http://ondemandhome.betaplanets.com/Webservice/";

@IonicPage() 
@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html',
})
export class MyAccountPage {
 
 lastImage: string = null;
 loading: Loading;
 imagebaseUrl:any;
 iconupload:any;
 defaultCardNum:any;
  userData: any = {};
  private isDisabled: boolean = true;
  public loader: any;
  stripecustId: any;
  stripecustname: any;
  defaultmonth: any;
  defaultyear: any;
  schemedetails: any;
  isHide: any=true;
  base64Image:any = '';
  data:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http, public app: App, private camera: Camera,
  private transfer: Transfer, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController, public authService: AuthServiceProvider,
   public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
	
	
  this.imagebaseUrl = 'http://ondemandhome.betaplanets.com/assets/userimages/';
  this.iconupload = true;
 
  }
  goback(){

    this.navCtrl.pop();

  }
 
  initUserInfo() {
 
    let userName = localStorage.getItem("userName");
    let userPass = localStorage.getItem("userPass");
               console.log("userName",userName);
               console.log("userPass",userPass);
    this.showLoading();
    this.authService.postData(userName, userPass).then((response) => {
      this.hideLoading();
      console.log("userdata",response);
      this.data = response;
      this.userData = this.data.result[0];
      
      this.http.get(apiUrl+'getstripecustomerid?userid='+this.userData.id).map(res => res.json()).subscribe(data => {
		 
		 if(data){			 
		  this.stripecustId= data[0].customerid; 
		  this.stripecustname= data[0].cardname;  
		  this.initStripeInfo();  
		  this.initCustomerPackage();  
         }
          },
        err => { 
          console.log(err);
        });    

    }, (error) => {
      this.hideLoading();
      this.showToast("Some Error Occur.")
    })  
  }
  
  initStripeInfo(){
	  
	  this.http.get(apiUrl+'getstripeinfo?customerid='+this.stripecustId).map(res => res.json()).subscribe(result => {
		  
		 this.defaultmonth= result.exp_month;
         this.defaultyear= result.exp_year;
         //~ let num=  result[0].cardnumber.substring(12,16);
         this.defaultCardNum ="************"+result.last4;
          },
        err => {
          console.log(err);
        });
	  
	  
  }

  initCustomerPackage() {
    this.http.get(apiUrl+'customerpackage?userid='+this.userData.id).map(res => res.json()).subscribe(datas => {
		 this.schemedetails= datas;
		//~ alert(datas.schemeid)
		 if(datas[0].schemeid==3){
		  
		   this.isHide=true;      
	  }else{
		  this.isHide=false; 
	  }
        }); 
  }
  
  
  ionViewWillEnter() {
    console.log('ionViewWillEnter AccountInfoPage ');
    this.initUserInfo();
  }

  showLoading() {
    this.loader = this.loadingCtrl.create({content: 'Loading...'});
    this.loader.present();

  }

  hideLoading() {
    this.loader.dismiss()
  }


  onEditAccountClick(accountInfo) {
    console.log("onEditAccountClick " + this.isDisabled);
    this.navCtrl.push(EditAccountPage, {"USERDATA": this.userData});

  }
  showpackInfo(){
    this.navCtrl.push(PackageInfoPage);
  }
  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 1000,
      position: 'bottom'
    });
    toast.present(toast);

  }

  onChangePassword() {
		this.navCtrl.push(ChangePasswordPage);
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

  /* %%%%%%%%%%%%%%%%%%%%%%%% upload image/file %%%%%%%%%%%%%%%%%%%%%% */


public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }
  public takePicture(sourceType) {
  // Create options for the Camera Dialog
  var options = {
    quality: 100,
    sourceType: sourceType,
    saveToPhotoAlbum: false,
    correctOrientation: true
  };
 
  // Get the data of an image
  this.camera.getPicture(options).then((imagePath) => {
    // Special handling for Android library
    if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
      this.filePath.resolveNativePath(imagePath)
        .then(filePath => {
          let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
          let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
          this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        });
    } else {
      var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
    }
  }, (err) => {
    this.presentToast('Not selecting image.');
  });
}
private createFileName() {
  var d = new Date(),
  n = d.getTime(),
  newFileName =  "image_"+n + ".jpg";
  return newFileName;
}
 
// Copy the image to a local folder
private copyFileToLocalDir(namePath, currentName, newFileName) {
  this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
    this.lastImage = newFileName;
    this.base64Image = normalizeURL(this.file.dataDirectory + newFileName);
  }, error => {
    this.presentToast('Error while storing file.');
  });
}
 
private presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'bottom'
  });
  toast.present();
}
 
// Always get the accurate path to your apps folder
public pathForImage(img) {
  if (img === null) {
    return '';
  } else {
    console.log(JSON.stringify(img));
    console.log(JSON.stringify( cordova.file.dataDirectory + img));
    var path = normalizeURL(cordova.file.dataDirectory + img);
    return path ;
   
    // return cordova.file.dataDirectory + img;
  }
}
public uploadImage(userid) {
	  
  var url = "http://ondemandhome.betaplanets.com/upload.php";
 
  // File for Upload
  var targetPath = this.pathForImage(this.lastImage);
  
  // File name only
  var filename = this.lastImage;
  
  this.http.get(apiUrl+'profileimage?userid='+userid+'&image='+filename).map(res => res.json()).subscribe(data => {   
  });
 
  var options = {
    fileKey: "file",
    fileName: filename,
    chunkedMode: false,
    mimeType: "multipart/form-data",
    params : {'fileName': filename}
  };
 
  const fileTransfer: TransferObject = this.transfer.create();
 
  this.loading = this.loadingCtrl.create({
    content: 'Uploading...',
  });
  this.loading.present();
 
  // Use the FileTransfer to upload the image
  fileTransfer.upload(targetPath, url, options).then(data => {
    this.loading.dismissAll()    
    this.presentToast('Image succesful uploaded.');
    this.iconupload = false;
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }, err => {
    this.loading.dismissAll()
    this.presentToast('Error while uploading file.');
  });
}
}
