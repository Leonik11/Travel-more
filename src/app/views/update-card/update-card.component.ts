import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardInterface } from 'src/app/interfaces';
import { CardService } from 'src/app/services';

@Component({
  selector: 'app-update-card',
  templateUrl: './update-card.component.html',
  styleUrls: ['./update-card.component.scss']
})
export class UpdateCardComponent implements OnInit {

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

  constructor(private cardService: CardService, private router: Router, private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    const currentCardId = this.activatedRouter.snapshot.params['id'];
    this.cardService.getCardById(currentCardId).subscribe(res => {
      const temp = res.data() as CardInterface;
      if (temp) {
        this.card = temp;
      } else {
        this.router.navigateByUrl('/');
      }
    });
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
        this.cardService.updateCard(this.card);
        this.router.navigateByUrl('/');
      }
    },2000)
  }

  onDelete() {
    this.cardService.deleteCard(this.card);
    this.router.navigateByUrl('/');
  }
}
