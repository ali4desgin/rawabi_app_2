import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CalcPage } from './../pages/calc/calc';
import { OffersPage } from '../pages/offers/offers';
import { Events } from 'ionic-angular';
import { NewOrdersPage } from '../pages/new-orders/new-orders';

import { Storage } from '@ionic/storage';

// import { OneSignal } from '@ionic-native/onesignal';
import { AdminsListPage } from '../pages/admins-list/admins-list';


// import { ChatPage } from '../pages/chat/chat';
import { Tabs2Page } from '../pages/tabs2/tabs2';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;





 
  data: any;

  rootPage: any;

  userinfo = {
   "user":"Thank you ",
   "firstletter":"T",
   "loggedin":false,
   "isAdmin":''

    };


  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public events: Events,private storage: Storage) {
      //public alertCtrl: AlertController
      //,private oneSignal: OneSignalOriginal
    this.initializeApp();

 

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'تسجيل الخروج', component: HomePage }
    ];


    events.subscribe('user:updatemenu', ( time) => {
      
      this.data = JSON.parse(localStorage.getItem("userData"));

      this.storage.get('userData').then((val) => {
    
        let data  =JSON.parse(val);

  

        if(data) {
         
        this.userinfo.user=data.user.username;
        this.userinfo.isAdmin=data.user.isAdmin;
        this.userinfo.firstletter=data.user.username.charAt(0).toUpperCase();
        this.userinfo.loggedin=true
      }else{
        
      }
  
       
  
  
        });

     
    
        
     
    });
    
  }

 


 
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.



      var notificationOpenedCallback = function(jsonData) {
        localStorage.setItem('id', JSON.stringify(jsonData.userId));
      };
  

        // window["plugins"].OneSignal.getIds(getPlayerIdCallback);
      window["plugins"].OneSignal
      .startInit("506f3538-e434-41e6-88d4-07e4f920ce4b", "677205426471")
      .handleNotificationOpened(notificationOpenedCallback)
      .endInit();


      


       this.storage.get('userData').then((val) => {
    
        let data  =JSON.parse(val);


        if(data) {
          this.userinfo.isAdmin=data.user.isAdmin;
          this.userinfo.user=data.user.username;
          this.userinfo.firstletter=data.user.username.charAt(0).toUpperCase();
          this.userinfo.loggedin=true
          this.rootPage = Tabs2Page; // user can user this.nav.setRoot(TutorialPage);
      }else{
          this.rootPage = TabsPage; // user can user this.nav.setRoot(LoginPage);
      }
  
       
  
  
        });
    
    
        
      
      this.splashScreen.hide();


    

      var getPlayerIdCallback = function (response){
       
        localStorage.setItem('id', JSON.stringify(response.userId));

    
       
      }
      // var notificationOpenedCallback = function(jsonData) {

      //  const type=jsonData.notification.payload.additionalData.type;

      //  if(type=="new_chat_message"){
        
      //   that.nav.push(ChatPage, {
      //     item:jsonData.notification.payload.additionalData.order_id,
         
      //    });
      //  }

      //  else{
      //   that.nav.push(NewOrdersPage);
      //  }

      
      // };

      


      

      // var notificationOpenedCallback = function(jsonData) {
      //   console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      // };
  
      // window["plugins"].OneSignal
      // .startInit("506f3538-e434-41e6-88d4-07e4f920ce4b", "677205426471")
      // .handleNotificationOpened(getPlayerIdCallback)
      // .endInit();
 

      

     

     this.statusBar.overlaysWebView(false);

// set status bar to white
    this.statusBar.backgroundColorByHexString('#000000');
  
     
   
      this.platform.setDir("rtl",true);

    });
  }






  logout(){
    //Api Token Logout 
    
  
   

      this.storage.clear()
      this.userinfo.user="تم تسجيل الخروج"
      this.userinfo.loggedin=false
      this.userinfo.firstletter="R"

    this.nav.setRoot(TabsPage);
}




myorders(){
  this.nav.setRoot(Tabs2Page);
}


viewNewOrders(){
  this.nav.push(NewOrdersPage);
}



ViewAdminsList(){
  
  this.nav.push(AdminsListPage,{
    isRedirect:false
  });
}


createOrder(){
  
  //this.nav.push(TabsPage , {tab:"offers"});
 this.nav.push(OffersPage);
}

calc(){
  this.nav.push(CalcPage);
}

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}