import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Message } from '../../common/message';
/*
  Generated class for the MessagesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MessagesProvider {

  constructor(private _db:AngularFireDatabase) {
    
  }

  fetch(){
    return this._db.list<Message>('messages').valueChanges();

  }

  add(item: Message){
    this._db.list("messages").set(item.msgKey,item);
  }

  remove(key: string){
    this._db.list("messages").remove(key);
  }
}
