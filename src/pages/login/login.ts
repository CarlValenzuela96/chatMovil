import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegistrarPage } from '../registrar/registrar'; 
import { AngularFireAuth } from '@angular/fire/auth';
import { UserPage } from '../user/user';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email:string;
  pass:string;
  msg:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public aFA: AngularFireAuth) {
    this.msg="";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  registro(){
    this.navCtrl.push(RegistrarPage);
  }

  login(){
      return this.aFA.auth.signInWithEmailAndPassword(this.email, this.pass).then(value=>{
        this.navCtrl.setRoot(UserPage,{nombre:this.aFA.auth.currentUser.email});
      }).catch(error=> {
        alert(error.message);
    });

  }

 
}
