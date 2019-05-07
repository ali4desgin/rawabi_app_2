import { Component } from '@angular/core';
import { IonicPage, NavController ,ToastController } from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import { CommonProvider } from "../../providers/common/common";
import { HomePage } from '../home/home';
import { Events } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';
import { Tabs2Page } from '../tabs2/tabs2';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  resposeData : any;
  userData = {"usename":"","phone":"00966", "password":"","email":""};

  constructor(public navCtrl: NavController, public authService: AuthServiceProvider, private toastCtrl:ToastController,public common: CommonProvider,public events: Events,private storage: Storage) {
  }

  ionViewDidLoad() {
   
      
       
  }



  ionViewWillEnter(){
    // console.log('ionViewDidLoad Login');
    // let data  = JSON.parse(localStorage.getItem("id"));
    // this.common.presentToast(data);
  } 


  
  register(){

   if(this.userData.phone && this.userData.password&&this.userData.usename){
    this.common.presentLoading();

    let data="";
     
        
       data = JSON.parse(localStorage.getItem("id"));
            
     

    


   
    let body = new FormData();
    body.append('username', this.userData.usename);
    body.append('phone', this.userData.phone);
    body.append('email', this.userData.email);
    body.append('password', this.userData.password);
    body.append('not_id', data);
    this.authService.postData(body, "user/register").then((result) =>{
    this.resposeData = result;


   
    this.common.closeLoading();
   
    if(this.resposeData.response){
  

      this.common.presentToast("تم التسجيل  بنجاح");

      this.login(this.userData.phone,this.userData.password);

      


    }
    else if(!this.resposeData.response){
      this.common.presentToast(this.resposeData.message);

    }
   
    


    }, (err) => {
                  this.common.closeLoading();
    });
   }
   else{
    this.presentToast("Give username and password");
   }
  
  }

  login(phone,password){

     let body = new FormData();

     let data = localStorage.getItem("id");


     body.append('phone', phone);
     body.append('password', password);
     body.append('not_id', data);
     this.common.presentLoading();
     this.authService.postData(body, "user/login").then((result) =>{
     this.resposeData = result;
     this.common.closeLoading();
 
 
   
   
 
    
     if(this.resposeData.response){
    
      this.storage.ready().then(() => {
        this.storage.set('userData', JSON.stringify(this.resposeData)).then(()=>{
          this.events.publish('user:updatemenu', 'hi');
        });
      });
       this.common.presentToast("تم تسجيل الدخول بنجاح");
       this.navCtrl.setRoot(Tabs2Page , { reload : true });
       
       
 
 
 
     }
     else{
       this.common.presentToast("خطأ في أسم المستخدم أو كلمة المرور");
 
     }
     
 
 
     }, (err) => {
       //Connection failed message
            console.log(err);
       this.common.closeLoading();
     });
    }

   
  
   

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

 

}
