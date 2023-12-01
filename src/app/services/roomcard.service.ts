import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

import { RoomCardInterface } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class RoomcardService {


  constructor(private afs: AngularFirestore, private router: Router) { }

  addRoom(apartment: RoomCardInterface){
    apartment.id =  this.afs.createId();
    apartment.hotelId = this.router.url.split("/")[2];
    apartment.uploaderAuthor = localStorage.getItem('token') || '';
    apartment.uploadTime = new Date().toString();

    return this.afs.collection('/apartments').add(apartment);
  }

  getRoomById(id: string){
    return this.afs.doc(`/apartments/${id}`).get();
  }

  getAllRooms(){
    return this.afs.collection('/apartments').snapshotChanges();
  }

  deleteRoom(apartment: RoomCardInterface){
    this.afs.doc(`/apartments/${apartment.id}`).delete();
  }

  updateRoom(apartment: RoomCardInterface) {
    this.afs.doc(`/apartments/${apartment.id}`).update(apartment);
  }
}




