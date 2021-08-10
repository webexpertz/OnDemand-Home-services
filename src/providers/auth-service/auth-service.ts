import { HttpClient, HttpErrorResponse, HttpHeaders,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

let apiUrl="http://ondemandhome.betaplanets.com/Webservice/";

@Injectable()
export class AuthServiceProvider {
data:any;
  constructor( public http: HttpClient) {
    console.log('Hello AuthServiceProvider Provider');
  } 

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
       })
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return (
      'Something bad happened; please try again later.');
  };

  async postData(username ,password) {
    var logindetail = "signin?email="+username+"&password="+password;
    return new Promise((resolve, reject) => { 
      this.http.get(apiUrl+""+logindetail).subscribe(res => {
			resolve(res);
        }, (err) => {
			reject(err);
        }); 
    });
  }
signupData(userData) {
    var signdetail = "signup?username="+userData.username+"&firstname="+userData.firstname+"&lastname="+userData.lastname+"&email="+userData.email+"&mobile="+userData.contact+"&password="+userData.password+"&address="+userData.address+"&state="+userData.state+"&zip="+userData.zip+"&apt="+userData.apt+"&city="+userData.city;
    return new Promise((resolve, reject) => { 
     this.http.get(apiUrl+""+signdetail).subscribe(res => {
			resolve(res);
        }, (err) => {
			reject(err);
        }); 
    });

  }

  getAllPlans() {
    return new Promise((resolve, reject) => {
      this.http.get(apiUrl + "getscheme").subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  getPlanStatus(userId){
    return new Promise((resolve, reject) => {
      this.http.get(apiUrl+"getplaninfo?userid="+userId).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }
  
  //~ getnotify(){
	 //~ const api= 'http://ondemandhome.betaplanets.com/Testservices/checkNotification';
    //~ return new Promise((resolve, reject) => {
      //~ this.http.get(api).subscribe(res => {
        //~ resolve(res);
      //~ }, (err) => {
        //~ reject(err);
      //~ });
    //~ }); 
  //~ }

   sendNotification(body) {
   //~ const api= 'http://ondemandhome.betaplanets.com/notifications/?';
   const api= 'http://ondemandhome.betaplanets.com/Webservice/checkNotification/?';
    return new Promise((resolve, reject) => {
      this.http.get(api+body, { responseType: 'text' }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }


  getAllServices() {
    const api = 'http://ondemandhome.betaplanets.com/Webservice/getallserviceavailable';
    return new Promise((resolve, reject) => {
      this.http.get(api).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }
  
  getAllServicesbyId(schemeId,val) {
     return new Promise((resolve, reject) => {
      this.http.get(apiUrl+'getAllServicesbyId?schemeid='+schemeId+'&userid='+val).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }
 getAllNotifications(userId) {
    return new Promise((resolve, reject) => {
      this.http.get(apiUrl+'getacceptstatus?userid='+userId).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  gettAllTechToken() {
    return new Promise((resolve, reject) => {
      this.http.get(apiUrl + "getalltechniciantoken").subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  getAllBookings(userId) {
    const api = 'http://ondemandhome.betaplanets.com/Webservice/getbookingbyid?userid=';
    return new Promise((resolve, reject) => {
      this.http.get(api + userId).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  getAllAcceptBookings(userId) {
    const api = 'http://ondemandhome.betaplanets.com/Webservice/getuseracceptstatus?userid=';
    return new Promise((resolve, reject) => {
      this.http.get(api + userId).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  registerToken(data) {
    return new Promise((resolve, reject) => {
      this.http.get(apiUrl + "tokenregister?" + data).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }
makePayement(data) {
    const api ='http://ondemandhome.betaplanets.com/stripe_payment_gateway/makepayment.php?';
    return new Promise((resolve, reject) => {
      this.http.get(api+data).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  submitBookingRequest(data) {
    return new Promise((resolve, reject) => {
      this.http.get(apiUrl + "technicianBooking?" + data).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  submitBookingRequestMulti(data) {
    return new Promise((resolve, reject) => {
      this.http.get(apiUrl + "technicianMultipleBooking?" + data).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  sendemailforAppointment(data) {
    return new Promise((resolve, reject) => {
      this.http.get(apiUrl + "SendEmailappointment?userid=" + data.userid+'&time='+data.time+'&bookingdate='+data.booking_date+'&username='+data.username+'&service='+data.service).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }
  

  sendnotificationforAppointment(data) {
    console.log(data);
    return new Promise((resolve, reject) => {
      this.http.get(apiUrl + "SendappointmentNotification?userid=" +data.userid+'&service='+data.service).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }
  updateData(data) {
    return new Promise((resolve, reject) => {
      this.http.get(apiUrl + "updateUserData?" + data).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  updatePlanData(data) {
    return new Promise((resolve, reject) => {
      this.http.get(apiUrl + "schemebooking?" + data).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  updateCardDetails(data) {
    return new Promise((resolve, reject) => {
      this.http.get(apiUrl + "updatecardinfo?" + data).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  getCardDetails(id) {
    return new Promise((resolve, reject) => {
      this.http.get(apiUrl + "getcardinfo?userid=" + id).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }
  deletBooking(id){
    return new Promise((resolve, reject) => {
      this.http.get(apiUrl + "deleteService?id=" + id).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }
  updateBooking(id,bookingtime,bookingdate){
    return new Promise((resolve, reject) => {
      this.http.get(apiUrl + "editService?id=" + id+"&bookingdate="+bookingtime+"&bookingtime="+bookingdate).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  getALertbadge(id){
    return new Promise((resolve, reject) => {
      this.http.get(apiUrl + "addOnDetailById?userid=" + id).subscribe(res => {
        resolve(res);
       
      }, (err) => {
        reject(err);
      });
    });
    
  }
}
