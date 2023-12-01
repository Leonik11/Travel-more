import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomCardInterface } from 'src/app/interfaces';
import { RoomcardService } from 'src/app/services';

@Component({
  selector: 'app-update-room',
  templateUrl: './update-room.component.html',
  styleUrls: ['./update-room.component.scss']
})
export class UpdateRoomComponent implements OnInit {

  public readonly defaultImage: string = "https://codemyui.com/wp-content/uploads/2015/09/cloud-file-upload-using-css.gif";

  

  public apartment: RoomCardInterface ={
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

  constructor(private RoomcardService: RoomcardService, private router: Router, private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    const currentRoomId = this.activatedRouter.snapshot.params['id'];
    this.RoomcardService.getRoomById(currentRoomId).subscribe(res => {
      const temp = res.data() as RoomCardInterface;
      if (temp) {
        this.apartment = temp;
        temp.id = res.id;


      }
    });
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
        this.RoomcardService.updateRoom(this.apartment);
        this.router.navigateByUrl('/');
      }
  }

  onDelete() {
    this.RoomcardService.deleteRoom(this.apartment);
    this.router.navigateByUrl('/');
  }
}
