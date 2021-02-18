import {Component, ViewChild} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import { HomePage } from '../home/home';
import {CalendarComponent} from "ionic2-calendar/calendar";

@IonicPage()
@Component({
  selector: 'page-customer-calender',
  templateUrl: 'customer-calender.html',
})

export class CustomerCalenderPage {
  @ViewChild(CalendarComponent) myCalendar:CalendarComponent;

  eventSource = [];
  	 events = [];
  viewTitle: string;
  selectedDay = new Date();
  navigatOBJ: any;
  allBookingDates: any = [];
  allBookings: any = [];
  allSelectedBookings: any = [];
  isHide: boolean = false;
  public loader: any;

  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingController: LoadingController, private toastCtrl: ToastController, private authService: AuthServiceProvider) {
    this.navigatOBJ = this.navParams.get('OBJ');
    this.calendar.currentDate = this.navigatOBJ.date;
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
  markDisabled = (date: Date) => {
    var current = new Date();
    current.setHours(0, 0, 0);
    return date < current;
  };

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

  initBookings() {
    this.showLoading();
    this.authService.getAllBookings(this.navigatOBJ.userId).then((response) => {
      this.hideLoading();
      this.allBookings = response;
      for (let data of this.allBookings) {
        this.allBookingDates.push(data.booking_date);
       // console.log("booking date " + data.booking_date);
        console.log("booking date formate " +new Date(data.booking_date));
        let date=new Date(data.booking_date);
        if(new Date().setHours(0,0,0)<date.setHours(0,0,0))
        {
          let  startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()+1));
       let endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()+1));
        console.log("booking date " +endTime);
       this.events.push({
          title: 'Event title - ',
          startTime: startTime,
          endTime: endTime,
          allDay: false
        });
        }
      if(data.booking_date===this.allBookings[this.allBookings.length-1].booking_date){
        this.eventSource=this.events;
      }
      }
      this.initallSelectedBookings()
    }, (error) => {
      this.hideLoading();
      this.showToast("Some Error Occur.")
    })
  }

  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
    console.log(" onTimeSelected "+this.allBookings);
    if (this.allBookings.length == 0) {
      console.log(" onTimeSelected in if "+this.allBookings);
      this.initBookings()
    }else{
      this.initallSelectedBookings()
    }
  }

 initallSelectedBookings(){
   this.allSelectedBookings=[];
   if (this.allBookingDates.includes(this.selectedDay.toLocaleDateString('en-US',{month:"2-digit", day:"2-digit",year:"numeric"}))) {
     console.log(" in upper if ");
     this.isHide = false;
     for (let data of this.allBookings) {
		 console.log('bookdata: '+data.booking_date);
       if (data.booking_date == this.selectedDay.toLocaleDateString('en-US',{month:"2-digit", day:"2-digit",year:"numeric"})) {
         this.allSelectedBookings.push(data);
         console.log("filter in if " + this.allSelectedBookings.length);
       }
     }
   } else {
     this.isHide = true;
   }
 }
 
 onClickHome(){
 this.navCtrl.setRoot(HomePage);
 }
}
