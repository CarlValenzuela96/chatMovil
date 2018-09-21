import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
import { Message } from '../../common/message';
import { Content, List } from 'ionic-angular';
import { ConfPage } from '../conf/conf'; 
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  @ViewChild(Content) content: Content;
  @ViewChild(List, {read: ElementRef}) chatList: ElementRef;
  
  // Arreglo "observable" con listado de mensajes
  messages: Observable<Message[]>;
  // Nuevo mensaje
  newMessage: string;
  usuario: string;
  id_usuario: string;
  private mutationObserver: MutationObserver;
  
  constructor(public navCtrl: NavController, private _db: AngularFireDatabase, public navParams: NavParams
    ,public aFA: AngularFireAuth) {
    this.messages = this._db.list<Message>('messages').valueChanges();
    this.usuario = this.navParams.get('usuario');
  }

  


  ionViewDidLoad(){
    this.mutationObserver = new MutationObserver((mutations) => {
        this.content.scrollToBottom();
    });

    this.mutationObserver.observe(this.chatList.nativeElement, {
        childList: true
    });
}

  send() {
    if(!this.newMessage)return;

    var user = this.aFA.auth.currentUser;


    this._db.list('messages').push({
      author: this.usuario,
      id_user: user.uid,
      message: this.newMessage,
      date : new Date().getHours()+":"+new Date().getMinutes()
    });
    this.newMessage = '';
    this.content.scrollToBottom(0);

  }

  delete(){
       
  }

  opciones(){
    this.navCtrl.push(ConfPage);
  }

 
 
}
