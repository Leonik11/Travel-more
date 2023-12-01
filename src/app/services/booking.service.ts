import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BookingInterface } from './../interfaces';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private afs: AngularFirestore, private router: Router) { }

  addBooking(booking: BookingInterface){
    booking.id = this.afs.createId();
    booking.bookingId = this.router.url.split("/")[2];
    booking.uploaderAuthor = localStorage.getItem('token') || '';
    booking.uploadTime = new Date().toString();

    return this.afs.collection('/booking').add(booking);
  }
  
  getBookingById(id: string){
    return this.afs.doc(`/booking/${id}`).get();
  }

  getAllBooking(){
    return this.afs.collection('/booking').snapshotChanges();
  }
}
