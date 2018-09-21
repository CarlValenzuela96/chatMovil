import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';

/**
 * Generated class for the RegistrarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registrar',
  templateUrl: 'registrar.html',
})
export class RegistrarPage {
  email:string;
  pass:string;
  msg:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public aFA: AngularFireAuth) {
    this.msg = "";
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrarPage');
  }

  registrar(){
     this.aFA.auth.createUserWithEmailAndPassword(this.email,this.pass).then(value=>{
      this.navCtrl.popToRoot();
    }).catch(error=> {
      alert(error.message);
    });

    
      
    
    
  }



}
