import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardInterface } from 'src/app/interfaces';
import { CardService } from 'src/app/services';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.scss']
})
export class CreateCardComponent implements OnInit {

  public readonly defaultImage: string = "https://codemyui.com/wp-content/uploads/2015/09/cloud-file-upload-using-css.gif";


  public card: CardInterface = {
    id: "", 
    hotelName: "",
    hotelEmail: "",
    hotelNumber: "",
    hotelStar: "",
    hotelLocation: "",
    image: [],
    description: "",
    hotelServices: "",
    reactionUserids: [],
    uploadTime: "",
    uploaderAuthor: '',
    rooms: [],
  }

  constructor(private cardService: CardService, private router: Router) { }

  ngOnInit(): void {
  }

  onChange(event: Event) {
    this.card.image = [];
    const target = event.target as HTMLInputElement;
    if (target.files) {
      if (target.files.length) {
        for (let i = 0; i < target.files.length; i++) {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(target.files[i]);
          fileReader.onload = () => {
            this.card.image.push(fileReader.result as string);
          }
        }
      }
    }
  }

  onUpload() {
    setTimeout(()=> {
      if(this.card.hotelName !== "" && this.card.hotelEmail !== "" && this.card.hotelNumber !== "" && this.card.hotelLocation !== ""){
      this.cardService.addCard(this.card);
      this.router.navigateByUrl('/');
      }
    },2000)
  }

}
