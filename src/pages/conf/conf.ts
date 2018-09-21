import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginPage } from '../login/login';
import { UserPage } from '../user/user';

/**
 * Generated class for the ConfPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-conf',
  templateUrl: 'conf.html',
})
export class ConfPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public aFA: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfPage');
  }


  salir(){
    this.aFA.auth.signOut().then(value=> {
      this.navCtrl.setRoot(LoginPage);
    }).catch(error=> {
      alert(error.message);
    });
  }

  cambiarNombre(){
    this.navCtrl.push(UserPage);
  }
}
