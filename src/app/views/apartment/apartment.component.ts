import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomCardInterface } from 'src/app/interfaces';
import { AuthService, RoomcardService, HeaderService } from 'src/app/services';

@Component({
  selector: 'app-apartment',
  templateUrl: './apartment.component.html',
  styleUrls: ['./apartment.component.scss']
})
export class ApartmentComponent implements OnInit {

  isUserAuthorized: boolean = false;
  isCurrentUploader: boolean = false;

  roomsArray: RoomCardInterface[] = [];
  tempRoomssArray: RoomCardInterface[] = [];

  isAuth: boolean = false;
  

  
 constructor(private auth: AuthService, private router: Router, private RoomcardService: RoomcardService, private header: HeaderService) { }

  ngOnInit(): void {
    this.isAuth = this.auth.isUserAuth();
    this.header.isAuth.subscribe(res => {
      this.isAuth = res;
      this.isAuth = this.auth.isUserAuth();
    });
    this.RoomcardService.getAllRooms().subscribe(res => {
      this.roomsArray = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        data.tempUploadTime = data.uploadTime.split("GMT").shift().split(" ").slice(1, 5).join(" ") || "";
        console.log(data);
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


  checkCurrentUser(apartment: RoomCardInterface){
    return apartment.uploaderAuthor  === localStorage.getItem('token') || localStorage.getItem('Gmail') === 'nick.leonidze@gmail.com' || localStorage.getItem('Gmail') === 'leonick0111@gmail.com' || localStorage.getItem('Gmail') === 'kdautinishvili@gmail.com'; 
  }
 
  checkRoomsId(apartment: RoomCardInterface){
    return this.router.url.split("/")[2] === apartment.hotelId 
  }
 
}



