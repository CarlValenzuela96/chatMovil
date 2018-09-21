import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AngularFireAuth } from '@angular/fire/auth';

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
  usuario:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public aFA: AngularFireAuth) {
    this.usuario = this.navParams.get('nombre');
    console.log(this.usuario);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }

  addUser(){
    if(!this.usuario)return;

    this.navCtrl.setRoot(HomePage,{usuario:this.usuario});

  }

}
