import { Component } from '@angular/core';
import { ModalController, ViewController ,NavParams,ToastController,NavController,App} from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import * as moment from 'moment';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import { ScheduleCalendarPage } from '../../pages/schedule-calendar/schedule-calendar';
/**
 * Generated class for the EditserviceComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'editservice',
  templateUrl: 'editservice.html'
})
export class EditserviceComponent {
  availableTimes = [];
service:any;
date:any;
times:any;
selectedddate:any;
startval:any;
event:any;
selectemsg:any;
targetvalue:any;
formgroup: FormGroup;
selectedTime:any;
mindate:any;
newdate:any;
serviceid :any;
checktime: boolean ;
  constructor(public modalCtrl: ModalController,public viewCtrl: ViewController,params: NavParams,private datePicker: DatePicker, private formbuilder: FormBuilder,public authService: AuthServiceProvider,private toastCtrl: ToastController,public navCtrl:NavController ,public app:App) {
    console.log('serviceId',params.get('serviceId'));
    this.serviceid = params.get('serviceId');
this.service = params.get('service');
this.date = params.get('bookingdate');
this.times = params.get('bookingtime');
this.selectemsg =  params.get('bookingtime');
this.selectedTime =  this.selectemsg;
var bookingtime = this.times.split(" ");
this.calculate(moment().hour(17).minute(15));
this.initFormGroup();

// console.log('this.date',this.date);
this.startval =this.date.split("/");
var dates = parseInt(this.startval[1],10)+1;
this.mindate = new Date().toISOString();
// var _entryDate = new Date(year, month, date);s
this.selectedddate =  new Date(this.startval[2],  parseInt(this.startval[0], 10) - 1,dates).toISOString();

let date=new Date(this.times);
console.log('this.selectedddate' ,this.availableTimes[0]);
  }
  dismiss(){
    this.viewCtrl.dismiss();
  }

  initFormGroup() {
    this.formgroup = this.formbuilder.group({
      "selectedTime": [''],
      "date_of_delivery":['']
    });
  }
  calculate(endTime) {

    console.log("endTime endTime",endTime);
    let startTime = this.getStartTime();
    while (startTime <= endTime) {
      this.availableTimes.push(moment(startTime).format("hh:mm a"));
      console.log("found", this.availableTimes);
      startTime.add('m', 15);
    }
  // let found =  this.availableTimes.find(res=>{
  //    res == this.selectedTime
  //   })
  //   if(found == undefined){
  //     this.availableTimes.push(this.selectedTime);
  //   }
  let found =this.availableTimes.forEach(item => {
    var value = item;
  //  console.log(value)
 
   if(value == this.selectedTime){
 console.log('value',value,);
 this.checktime = true;
// return this.newstring;
   }
  
  })
    console.log("found",this.checktime);

    if(this.checktime != true){
          this.availableTimes.push(this.selectedTime);
        }


    return this.availableTimes;
  }
  getStartTime() {
    var date = new Date(this.date);
    let selectedDate = date.toLocaleDateString('en-US',{month:"2-digit", day:"2-digit",year:"numeric"});
    let now = new Date().toLocaleDateString('en-US',{month:"2-digit", day:"2-digit",year:"numeric"});
    if (moment(selectedDate).isAfter(now)) {
      return moment().hour(8).minute(0)
    } else {
      return moment().add('m', 45 - moment().minute() % 45)
    }
  }
  onChange(val){
    console.log("selctedtime",val);}

  //  console.log("selctedtime",$event.target.value);}
  onSubmitClick(formValue) {
 
    var date = new Date(formValue.date_of_delivery);
    this.newdate = ('0' +date.getDate()).slice(-2);
    var finaldate = parseInt(this.newdate)-1;
    var selecteddate = ('0' + (date.getMonth()+1)).slice(-2) +"/" +('0' + finaldate).slice(-2) +"/"+ date.getFullYear();
    console.log('formvalue', selecteddate );
    console.log('formvalue2',('0' + finaldate).slice(-2) );
    this.authService.updateBooking(this.serviceid,selecteddate,formValue.selectedTime).then((result) => {
      this.showToast("Service updated");
      this.viewCtrl.dismiss();
      this.navCtrl.push(ScheduleCalendarPage);
    }, (error) => {

      console.log("submit error " + JSON.stringify(error));
      this.showToast("Some error occur. ");
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
  dateChanged(){
    console.log("datechanged",this.selectedddate);
    var date = new Date(this.selectedddate);
    this.newdate = ('0' +date.getDate()).slice(-2);
    var finaldate = parseInt(this.newdate)-1;
    var selecteddate = ('0' + (date.getMonth()+1)).slice(-2) +"/" +('0' + finaldate).slice(-2) +"/"+ date.getFullYear();
    console.log("datechang",selecteddate);
    this.date = selecteddate;
    this.availableTimes = [];
    this.calculate(moment().hour(17).minute(15));
  }
//   done($event){
// console.log("Dgfhg",$event);
// this.date =$event;
// this.calculate(moment().hour(17).minute(15));
//   }
}
