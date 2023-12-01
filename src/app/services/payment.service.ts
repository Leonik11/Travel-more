import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { PaymentInterface } from './../interfaces';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private afs: AngularFirestore, private router: Router) { }

  addPayment(payment: PaymentInterface){
    payment.id = this.afs.createId();
    payment.uploaderAuthor = localStorage.getItem('token') || '';
    payment.uploadTime = new Date().toString();

    return this.afs.collection('/payment').add(payment);
  }
  
  getPaymentById(id: string){
    return this.afs.doc(`/payment/${id}`).get();
  }

  getAllPaymentg(){
    return this.afs.collection('/payment').snapshotChanges();
  }
}
