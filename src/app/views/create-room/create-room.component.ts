import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomCardInterface } from 'src/app/interfaces';
import { RoomcardService} from 'src/app/services'
@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss']
})
export class CreateRoomComponent implements OnInit {

  public readonly defaultImage: string = "https://codemyui.com/wp-content/uploads/2015/09/cloud-file-upload-using-css.gif";
  public apartment: RoomCardInterface = {
    hotelId: "",
    id: "",
    uploaderAuthor: "",
    roomPrice: "",
    length: "",
    roomsNumber: "",
    Bathroom: "",
    Bedroom:"",
    Beds: "",
    Kitchen: "",
    Floor: "",
    image: [],
    roomDescription: "",
    roomServices: "",
    uploadTime:'',
    reactionUserids: []
  }

  constructor(private RoomcardService: RoomcardService, private router: Router) { }
 
  
  

  ngOnInit(): void {
  }
  
  
  onChange(event: Event) {
    this.apartment.image = [];
    const target = event.target as HTMLInputElement;
    if (target.files) {
      if (target.files.length) {
        for (let i = 0; i < target.files.length; i++) {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(target.files[i]);
          fileReader.onload = () => {
            this.apartment.image.push(fileReader.result as string);
          }
        }
      }
    }
  }
  onUpload() {
      if(this.apartment.roomPrice !== "" && this.apartment.length !== "" && this.apartment.roomsNumber !== "" && this.apartment.Bathroom !== "" && this.apartment.Bedroom !== "" && this.apartment.Beds !== "" && this.apartment.Kitchen !== "" && this.apartment.Floor !== "" && this.apartment.roomDescription !== "" && this.apartment.roomServices !== ""){
        this.RoomcardService.addRoom(this.apartment);
        this.router.navigateByUrl('/');
      }
  }
}
