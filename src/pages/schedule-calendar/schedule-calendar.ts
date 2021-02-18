import {Component, ViewChild} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController,ModalController} from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {CalendarComponent} from "ionic2-calendar/calendar";
import { AlertController } from 'ionic-angular';
import { EditserviceComponent} from '../../components/editservice/editservice';


@IonicPage()
@Component({
  selector: 'page-schedule-calendar',
  templateUrl: 'schedule-calendar.html',
})
export class ScheduleCalendarPage {
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
  date :any = new Date();
  data:any = this.date.setDate(this.date.getDate() +1)
  calendar = {
    mode: 'month',
    currentDate: this.date
  };
  userId :any;
  
 constructor(public navCtrl: NavController, public navParams: NavParams,  private authService: AuthServiceProvider,
   private loadingController: LoadingController, private toastCtrl: ToastController,public alertCtrl: AlertController,public modalCtrl: ModalController) {
    this.userId=JSON.parse(localStorage.getItem('userData')).id;
    // console.log(this.date.setDate(this.date.getDate() + 1));
    console.log(this.date);
   }
  //  ionViewWillEnter(){
  //   //  this.initBookings();
  //    this.initallSelectedBookings();
  //  }
   initBookings() {
   this.showLoading();
    this.authService.getAllBookings(this.userId).then((response) => {
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
    if (this.allBookings.length == 0) {
      console.log(" onTimeSelected in if "+this.allBookings);
      this.initBookings()
    }else{
      this.initallSelectedBookings()
    }



  }

 initallSelectedBookings(){
   this.allSelectedBookings=[];
     //~ alert("All allBookingDates "+this.allBookingDates +" "+this.selectedDay.toLocaleDateString('en-US',{month:"2-digit", day:"2-digit",year:"numeric"}))
   if (this.allBookingDates.includes(this.selectedDay.toLocaleDateString('en-US',{month:"2-digit", day:"2-digit",year:"numeric"}))) {
     console.log(" in upper if ");
     //~ alert(" in upper if "+this.selectedDay.toLocaleDateString('en-US',{month:"2-digit", day:"2-digit",year:"numeric"}))
     this.isHide = false;
     for (let data of this.allBookings) {
       if (data.booking_date == this.selectedDay.toLocaleDateString('en-US',{month:"2-digit", day:"2-digit",year:"numeric"})) {
         this.allSelectedBookings.push(data);
         console.log("filter in if " + this.allSelectedBookings.length);
         console.log("allSelectedBookings " + this.allSelectedBookings);
       }
     }
   } else {
     this.isHide = true;
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
  showLoading() {
    this.loader = this.loadingController.create({content: 'Loading...'});
    this.loader.present();

  }

  hideLoading() {
    this.loader.dismiss()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TechCalenderPage');
  }
	 markDisabled = (date: Date) => {
    var current = new Date();
    current.setDate(current.getDate() +1)
    current.setHours(0, 0, 0);
    return date < current;
  };
 onViewTitleChanged(title) {
    this.viewTitle = title;
  }  

  editBooking(value){
    let profileModal = this.modalCtrl.create(EditserviceComponent, { serviceId: value.id ,service:value.service,bookingdate:value.booking_date,bookingtime:value.booking_time}, {cssClass:'my-custom-modal-CSS'});
    profileModal.present();
    // profileModal.onDidDismiss(() => { this.ionViewWillEnter(); }); 
   console.log("value",value);
  }
  showAlert(val) {
    const alert = this.alertCtrl.create({
      // title: val.service,
      subTitle: 'Are you sure want to delete this service',
      buttons: [{text:'OK' , handler: () => { this.deleteServie(val)
       } }]
    });
    alert.present();
  }
  deleteServie(val){
    this.authService.deletBooking(val.id).then((response) => {
      this.showToast("Service deleted")
      this.initBookings();
    }, (error) => {
    
      this.showToast("Some Error Occur.")
    })
    
  }
}
