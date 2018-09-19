import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
import { Message } from '../../common/message';
import { Content, List, ModalController } from 'ionic-angular';

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
  private mutationObserver: MutationObserver;
  
  constructor(public navCtrl: NavController, private _db: AngularFireDatabase, private modal: ModalController) {
    this.messages = this._db.list<Message>('messages').valueChanges();
  }

  openModal(){
    const mm = this.modal.create('ConfModalPage');
    mm.present();
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

    this._db.list('messages').push({
      author: 'Carl',
      message: this.newMessage,
      date : new Date().getHours()+":"+new Date().getMinutes()
    });
    this.newMessage = '';
    this.content.scrollToBottom(0);
  }

 
 
}
