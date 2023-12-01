import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingInterface } from 'src/app/interfaces';
import { BookingService } from 'src/app/services';
import { RoomCardInterface } from 'src/app/interfaces';
import { AuthService, RoomcardService, HeaderService } from 'src/app/services';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  isUserAuthorized: boolean = false;
  isCurrentUploader: boolean = false;
  roomsArray: RoomCardInterface[] = [];
  tempRoomssArray: RoomCardInterface[] = [];
  isAuth: boolean = false;

  public booking: BookingInterface = {
    id:  "",
    bookingId: "",
    uploaderAuthor:  "",
    visitorName:  "",
    dayNumber:  "",
    peopleNumber:  "",
    children:  "",
    uploadTime:  "",
    tempUploadTime:  "",
  }
  constructor(private header: HeaderService, private auth: AuthService, private BookingService: BookingService, private router: Router) { }


  ngOnInit(): void {
    this.isAuth = this.auth.isUserAuth();
    this.header.isAuth.subscribe(res => {
      this.isAuth = res;
      this.isAuth = this.auth.isUserAuth();
    });
    this.BookingService.getAllBooking().subscribe(res => {
      this.roomsArray = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        data.tempUploadTime = data.uploadTime.split("GMT").shift().split(" ").slice(1, 5).join(" ") || "";
        return data;
      });
      this.tempRoomssArray = this.roomsArray;
    }, err => {
      console.log(err);
    });

    this.header.isAuth.subscribe(res => {
      this.isUserAuthorized = res;

      if (localStorage.getItem('token')) {
        this.isUserAuthorized = true;
      }
    });
  }
  onUpload() {
    if(this.booking.visitorName !== "" && this.booking.dayNumber !== "" && this.booking.peopleNumber !== "" && this.booking.children !== ""){
      this.BookingService.addBooking(this.booking);
      this.router.navigateByUrl('payment');
    }
}
checkRoomsId(booking: BookingInterface){
  return this.router.url.split("/")[2] === booking.id 
}

}
