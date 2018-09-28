import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
import { Message } from '../../common/message';
import { Content, List } from 'ionic-angular';
import { ConfPage } from '../conf/conf'; 
import { AngularFireAuth } from '@angular/fire/auth';
import { MessagesProvider } from '../../providers/messages/messages';
import { Camera, CameraOptions } from '@ionic-native/camera';

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
  msgKey: string;
  item : Message;

  image: string;
  estImage: boolean;
  private mutationObserver: MutationObserver;
  
  constructor(public navCtrl: NavController, private _db: AngularFireDatabase, public navParams: NavParams
    ,public aFA: AngularFireAuth, private _provider: MessagesProvider,private camera: Camera) {
    
    this.messages = this._provider.fetch();
    this.usuario = this.navParams.get('usuario');
    this.id_usuario = this.aFA.auth.currentUser.uid;  
    this.estImage = true;

    this.image = '';
    
  }

  
picture(sourceType: number){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType:sourceType
    }
  
    this.camera.getPicture(options).then((imageData) => {
  
    this.image = 'data:image/jpeg;base64,' + imageData;
    this.estImage = false;
    }, (err) => {
   
    });
  }



  ionViewDidLoad(){
    this.mutationObserver = new MutationObserver((mutations) => {
        this.content.scrollToBottom();
    });

    this.mutationObserver.observe(this.chatList.nativeElement, {
        childList: true
    });
}

  validacionForm(){
    var estado = false;
    if(this.image != "" && !this.newMessage){
      this.newMessage = "";
      estado = false;
    }else if(this.image != "" && this.newMessage){
      estado = false;
    }else if(!this.newMessage && this.image==""){
      estado = true;
    }

    return estado;
  }
  send() {
    if(this.validacionForm())return;

    var user = this.aFA.auth.currentUser;
    this.msgKey = this._db.createPushId();
   
    this.item = {
      author: this.usuario,
      id_user: user.uid,
      message: this.newMessage,
      date : new Date().getHours()+":"+new Date().getMinutes(),
      msgKey: this.msgKey,
      image: this.image
    };

    this._provider.add(this.item);
    this.newMessage = '';
    this.image ='';
    this.estImage = true;
    this.content.scrollToBottom(0);

  }
  
  
  delete(key){
    this._provider.remove(key);
  }

  opciones(){
    this.navCtrl.push(ConfPage);
  }

  borrarFoto(){
    this.image = "";
    this.estImage = true;
  } 
 
}
