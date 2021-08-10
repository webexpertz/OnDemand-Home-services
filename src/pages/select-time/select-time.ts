import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import * as moment from 'moment';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import { CustomerCalenderPage } from '../customer-calender/customer-calender';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the SelectTimePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-time',
  templateUrl: 'select-time.html',
})

export class SelectTimePage {
  availableTimes = [];
  startTime: any;
  endTime: any;
  formgroup: FormGroup;
  navigatOBJ: any;
  public loader: any;
  private userId: any;
  private allTokens: any = [];
  private contact: any;
  private userData: any;
  schemeId: any;
  selectedService = [];
  selectedId = [];
  endApi : any ;
  note = [];
  notes:any;
  des =[] ;
  desid =[] ;
  allBookings: any;
  dataService: any;
  selectedDate: any;



  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, private formbuilder: FormBuilder, public authService: AuthServiceProvider, public loadingController: LoadingController,private alertCtrl: AlertController) {
    this.navigatOBJ = this.navParams.get("OBJ");
    this.userData = JSON.parse(localStorage.getItem("userData"));
    this.userId = this.userData.id;
    this.calculate(moment().hour(17).minute(15));
    this.initFormGroup();
    this.contact = this.userData.mobile;
    this.schemeId =localStorage.getItem("schemeId"); 

this.checkSlot();
  }

  initFormGroup() {
    this.formgroup = this.formbuilder.group({
      "selectedTime": [''],
    });
  }

  checkSlot() {
    this.authService.getAllBookings(this.userId).then((response) => {
     this.allBookings = response;
     console.log("all bookings", this.allBookings);
   });
 }

 selectTime(ev){
   console.log(ev)
this.selectedDate = moment(this.navigatOBJ.date).format('MM/DD/YYYY');
console.log(this.selectedDate);
   for (let data of this.allBookings) {
    console.log("all Data", data)
     console.log("booking date " + data.booking_time);
     if(data.booking_date == this.selectedDate){
       console.log("data match");
     if(data.booking_time == ev){
      this.showToast("Already booked!! Please choose different slot");
      this.formgroup.controls['selectedTime'].setValue('');
     }else{
      console.log("dont match");
     }
    }else{
      console.log("dont match");
    }
    }
 }


  calculate(endTime) {
    console.log("endTime endTime",endTime);
    let startTime = this.getStartTime();
    while (startTime <= endTime) {
      this.availableTimes.push(moment(startTime));
      startTime.add('m', 15);
    }
    return this.availableTimes;
  }


  getStartTime() {
    console.log("date",this.navigatOBJ.date);
    let selectedDate = this.navigatOBJ.date.toLocaleDateString('en-US',{month:"2-digit", day:"2-digit",year:"numeric"});
    let now = new Date().toLocaleDateString('en-US',{month:"2-digit", day:"2-digit",year:"numeric"});
    if (moment(selectedDate).isAfter(now)) {
      return moment().hour(8).minute(0)
    } else {
      return moment().add('m', 45 - moment().minute() % 45)
    }
  }

  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 1000,
      position: 'bottom'
    });
    toast.present(toast);
  }

 submitDataOnServer(time, obj) {

  if(this.navigatOBJ.multiObj == "true"){
    for(let i=0;i<this.navigatOBJ.service.length;i++){
      // console.log(this.navigatOBJ.service[i].services);
      this.selectedService.push(this.navigatOBJ.service[i].services);
      this.selectedId.push(this.navigatOBJ.service[i].id);
      this.des.push(this.navigatOBJ.service[i].description);
      this.note.push(this.notes);
    }

    // for(let i=0;i<this.navigatOBJ.description.length;i++){
    //   // console.log(this.navigatOBJ.service[i].services);
    //   this.des.push(this.navigatOBJ.description[i].description);
    //   this.desid.push(this.navigatOBJ.description[i].id);

    // }

    this.endApi = "userid=" + this.userId +
    "&username=" + this.userData.username +
    "&service=" + this.selectedService+
    "&serviceid=" + this.selectedId+
    "&booking_date=" + this.navigatOBJ.date.toLocaleDateString("en-US",{month:"2-digit", day:"2-digit",year:"numeric"}) +
    "&booking_time=" + time +
    "&schemeid=" + this.schemeId +
    "&contact=" + this.contact +
    "&status=requested"+
    "&description="+this.des+
    "&note=" + this.note+
    "&calculatedate=" + new Date()+
    "&date=" + new Date();

    console.log("sadfsafsafsfd  dsfsad sd  sadf   sad as  ad a", this.endApi);

    this.showLoading();
    console.log("id " + this.userId + " service " + this.navigatOBJ.service.services);
      // console.log(endApi);
    this.authService.submitBookingRequestMulti(this.endApi).then((response) => {
      this.authService.gettAllTechToken().then((result) => {
        this.allTokens = result[0].token;
        this.sendNotification(time, obj);
        this.showToast("Request Send Successfully.");
        
        this.hideLoading();
        let alert = this.alertCtrl.create({
          title: 'Please Select',
          inputs: [
            {
              type: 'radio',
              label: 'Text',
              value: '0'
            },
            {
              type: 'radio',
              label: 'Email',
              value: '1'
            }
          ],
          buttons: [
            // {
            //   text: 'Cancel',
            //   role: 'cancel',
            //   handler: () => {
            //     console.log('Cancel clicked');
            //   }
            // },
            {
              text: 'OK',
              handler: (data:string) => {
                console.log('OK clicked: ' ,data);
                   if(data == '1'){
                    this.endApi = {"userid":this.userId ,
                    "username" : this.userData.username ,
                    "service" : this.selectedService,
                 
                    "booking_date" : this.navigatOBJ.date.toLocaleDateString("en-US",{month:"2-digit", day:"2-digit",year:"numeric"}) ,
                    "time" : time }
                    this.authService.sendemailforAppointment(this.endApi).then((response) => {
                      console.log("send email",response);
                    })
                   }else if(data == '0'){
                    this.endApi = {"userid":this.userId ,
                 
                    "service" : this.selectedService,
                 
              }
                    this.authService.sendnotificationforAppointment(this.endApi).then((response) => {
                      console.log("send notification",response);
                    },err=>{
                      console.log("error",err);
                    })
                   }

                // I NEED TO GET THE VALUE OF THE SELECTED RADIO BUTTON HERE
              }
            }
          ]
        });
        alert.present();
        this.navCtrl.push(CustomerCalenderPage, {'OBJ': obj});
      })


    }, (error) => {
      this.hideLoading();
      console.log("submit error " + JSON.stringify(error));
      this.showToast("Some error occur. ")
    })


  }else{
    // alert("false");
    this.endApi = "userid=" + this.userId +
    "&username=" + this.userData.username +
    "&service=" + this.navigatOBJ.service.services +
    "&serviceid=" + this.navigatOBJ.service.id +
    "&booking_date=" + this.navigatOBJ.date.toLocaleDateString("en-US",{month:"2-digit", day:"2-digit",year:"numeric"}) +
    "&booking_time=" + time +
    "&schemeid=" + this.schemeId +
    "&contact=" + this.contact +
    "&note=" +this.notes +
    "&status=requested" +
    "&calculatedate=" + new Date();

    this.showLoading();
    console.log("id " + this.userId + " service " + this.navigatOBJ.service.services);
      // console.log(endApi);
    this.authService.submitBookingRequest(this.endApi).then((response) => {
      this.authService.gettAllTechToken().then((result) => {
        this.allTokens = result[0].token;

        this.sendNotification(time, obj);
        this.showToast("Request Send Successfully.");
        this.hideLoading();
        let alert = this.alertCtrl.create({
          title: 'Please Select',
          inputs: [
            {
              type: 'radio',
              label: 'Text',
              value: '0'
            },
            {
              type: 'radio',
              label: 'Email',
              value: '1'
            }
          ],
          buttons: [
            // {
            //   text: 'Cancel',
            //   role: 'cancel',
            //   handler: () => {
            //     console.log('Cancel clicked');
            //   }
            // },
            {
              text: 'OK',
              handler: (data:string) => {
                console.log('OK clicked: ' ,data);
                   if(data == '1'){
                    this.endApi = {"userid":this.userId ,
                    "username" : this.userData.username ,
                    "service" : this.selectedService,
                 
                    "booking_date" : this.navigatOBJ.date.toLocaleDateString("en-US",{month:"2-digit", day:"2-digit",year:"numeric"}) ,
                    "time" : time }
                    this.authService.sendemailforAppointment(this.endApi).then((response) => {
                      console.log("send email",response);
                    })
                   }else if(data == '0'){
                    this.endApi = {"userid":this.userId ,
                 
                    "service" : this.selectedService,
                 
              }
                    this.authService.sendnotificationforAppointment(this.endApi).then((response) => {
                      console.log("send notification",response);
                    },err=>{
                      console.log("error",err);
                    })
                   }

                // I NEED TO GET THE VALUE OF THE SELECTED RADIO BUTTON HERE
              }
            }
          ]
        });
        alert.present();
        this.navCtrl.push(CustomerCalenderPage, {'OBJ': obj});
      })


    }, (error) => {
      this.hideLoading();
      console.log("submit error " + JSON.stringify(error));
      this.showToast("Some error occur. ")
    })
  }

  }

  showLoading() {
    this.loader = this.loadingController.create({content: 'Loading...'});
    this.loader.present();
  }

  hideLoading() {
    this.loader.dismiss()
  }

  sendNotification(selectedTime, obj) {
    console.log("selectedTime",selectedTime,"obj",obj);
    const formatedDate = moment(obj.date).format('MM DD YYYY');
    //~ let body='title='+ obj.service.services+'&message='+" "+'&firebase_token='+this.allTokens;

    if(this.navigatOBJ.multiObj == "true"){

      let body='title='+ JSON.stringify(this.selectedService) +'&message='+'';

      this.authService.sendNotification(body).then((result) => {
        console.log(" Multi Notification success ",JSON.stringify(result));
        console.log(" Notification success ",result);
        // this.showToast("Request Send Successfully.");
        // this.hideLoading();
        // this.navCtrl.push(CustomerCalenderPage, {'OBJ': obj});
      }, (reject) => {
        this.hideLoading();
        // console.log("Notification error  " + JSON.stringify(reject));
        // this.showToast("Some error occur to send request please try again. ")
        this.navCtrl.push(CustomerCalenderPage, {'OBJ': obj});

      })

    }else{

      let body='title='+ obj.service.services+'&message='+'';

      this.authService.sendNotification(body).then((result) => {
        console.log("Notification success ",JSON.stringify(result));
        // this.showToast("Request Send Successfully.");
        // this.hideLoading();
        // this.navCtrl.push(CustomerCalenderPage, {'OBJ': obj});
      }, (reject) => {
        this.hideLoading();
        // console.log("Notification error  " + JSON.stringify(reject));
        // this.showToast("Some error occur to send request please try again. ")
        this.navCtrl.push(CustomerCalenderPage, {'OBJ': obj});

      })

    }


  }

  onSubmitClick(formValue) {
    let obj = {
      userId: this.userId,
      service: this.navigatOBJ.service,
      date: this.navigatOBJ.date,
      time: formValue.selectedTime,
     
    };

    this.submitDataOnServer(formValue.selectedTime, obj);

  }
}
