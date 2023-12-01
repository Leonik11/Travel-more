import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { CardInterface } from './../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private afs: AngularFirestore) { }

  addCard(card: CardInterface){
    card.id = this.afs.createId();
    card.uploaderAuthor = localStorage.getItem('token') || '';
    card.uploadTime = new Date().toString();

    return this.afs.collection('/cards').add(card);
  }

  getCardById(id: string){
    return this.afs.doc(`/cards/${id}`).get();
  }

  getAllCards(){
    return this.afs.collection('/cards').snapshotChanges();
  }

  deleteCard(card: CardInterface){
    this.afs.doc(`/cards/${card.id}`).delete();
  }

  updateCard(card: CardInterface) {
    this.afs.doc(`/cards/${card.id}`).update(card);
  }
}
