import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { TabsPage } from '../pages/tabs/tabs';
import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import {NotificationsPage} from "../pages/notifications/notifications";
import { MyAccountPage } from '../pages/my-account/my-account';
import { EditAccountPage } from '../pages/edit-account/edit-account';
import { AboutUsPage } from '../pages/about-us/about-us';
import { MySelectServicePage } from '../pages/select-service/select-service';
import { TermServicesPage } from '../pages/term-services/term-services';
import { MembershipPage } from '../pages/membership/membership';
import { CardDetailsPage } from '../pages/card-details/card-details';
import {NotificationDetailPage} from "../pages/notifcation-detail/notifcation-detail";
import { CustomerCalenderPage } from '../pages/customer-calender/customer-calender';
import { ScheduleCalendarPage } from '../pages/schedule-calendar/schedule-calendar';
import { ResetpassPage } from '../pages/resetpass/resetpass';
import { EditmemebershipPage } from '../pages/editmemebership/editmemebership';
import { ScheduleServicePage } from '../pages/schedule-service/schedule-service';

import { File } from '@ionic-native/file'; 
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { NgCalendarModule  } from 'ionic2-calendar';
import { Stripe } from '@ionic-native/stripe';
import {FCM} from "@ionic-native/fcm";
import {LocalNotifications} from "@ionic-native/local-notifications";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';

import {PackageInfoPage} from '../pages/package-info/package-info';

import { StandardPropertyPage} from '../pages/standard-property/standard-property';

import { SpecificRepairPage } from '../pages/specific-repair/specific-repair';
import  { PayPage} from '../pages/pay/pay';
import { EditserviceComponent} from '../components/editservice/editservice';
import { DatePicker } from '@ionic-native/date-picker';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { IonicStorageModule } from '@ionic/storage';
import{ServiceModalComponent} from "../components/service-modal/service-modal"
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    TabsPage,
    LoginPage,
    SignupPage,
    ChangePasswordPage,
    NotificationsPage,
    MyAccountPage,
    EditAccountPage,
    AboutUsPage,
    MySelectServicePage,
    TermServicesPage,
    MembershipPage,
    CardDetailsPage,
    NotificationDetailPage,
    CustomerCalenderPage,
    ScheduleCalendarPage,
    ResetpassPage,
    EditmemebershipPage,
    PackageInfoPage,
    ScheduleServicePage,
    StandardPropertyPage,
    SpecificRepairPage,
    PayPage,EditserviceComponent,
    ServiceModalComponent
  ],
  
  imports: [
    BrowserModule,
    HttpModule,
    NgCalendarModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    TabsPage,
    LoginPage,
    SignupPage, 
    ChangePasswordPage,
    NotificationsPage,
    MyAccountPage,
    EditAccountPage,
    AboutUsPage,
    MySelectServicePage,
    TermServicesPage,
    MembershipPage,
    CardDetailsPage,
    NotificationDetailPage,
    CustomerCalenderPage,
    ScheduleCalendarPage,
    ResetpassPage,
    EditmemebershipPage,
    PackageInfoPage,
    ScheduleServicePage,
    StandardPropertyPage,
    SpecificRepairPage,
    PayPage,EditserviceComponent,
    ServiceModalComponent
  ],
  
  providers: [
    StatusBar,
    SplashScreen,
    File,
    Transfer,
    Camera,
    FilePath,
    Stripe,
    FCM,
    InAppBrowser,
    LocalNotifications,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,DatePicker
  ]
})
export class AppModule {}
