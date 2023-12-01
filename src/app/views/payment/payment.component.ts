import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentInterface } from 'src/app/interfaces';
import { PaymentService } from 'src/app/services';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  public payment: PaymentInterface = {
    id: "",
    uploaderAuthor: "",
    fullName: "",
    phoneNumber: "",
    card: "",
    MMYY: "",
    CVC: "",
    uploadTime: "",
    tempUploadTime: "",
  }
  constructor(private router: Router, private PaymentService: PaymentService) { }

   ngOnInit(): void {
  }
  onUpload() {
    if(this.payment.fullName !== "" && this.payment.phoneNumber !== "" && this.payment.card !== "" && this.payment.MMYY !== "" && this.payment.CVC !== ""){
      this.PaymentService.addPayment(this.payment);
      this.router.navigateByUrl('/');
    }
}

}
