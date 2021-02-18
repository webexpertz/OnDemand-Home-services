import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Nav , Tabs } from 'ionic-angular';

import { HomePage } from '../home/home';
import { MySelectServicePage } from '../select-service/select-service';
import { ScheduleCalendarPage } from '../schedule-calendar/schedule-calendar';
import { ScheduleServicePage } from '../schedule-service/schedule-service'

import { SpecificRepairPage } from '../specific-repair/specific-repair';


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab:Tabs;
  indexvalue  =  0 ;
  indexofvalue  =  0 ;


  tab1Root = HomePage;
  tab2Root : any ;
  tab3Root = ScheduleCalendarPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    if(localStorage.getItem('schemeId') > '1'){
      this.tab2Root = SpecificRepairPage ;
    }else{
      this.tab2Root = ScheduleServicePage ;

    }


    this.tab  =  this.navCtrl.parent;

    if(this.navParams.get("indexof")){

      console.log("indexof",this.navParams.get("indexof"));
      this.indexofvalue=this.navParams.get("indexof");
      this.tab.select(1);
    }

  }

  

}
