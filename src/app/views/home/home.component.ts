import { Component, OnInit } from '@angular/core';
import { CardInterface } from 'src/app/interfaces';
import { AuthService, CardService, HeaderService } from 'src/app/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isUserAuthorized: boolean = false;
  isCurrentUploader: boolean = false;

  cardsArray: CardInterface[] = [];
  tempCardsArray: CardInterface[] = [];

  isAuth: boolean = false;

  constructor(private auth: AuthService, private cardService: CardService, private header: HeaderService) { }

  ngOnInit(): void {
    this.isAuth = this.auth.isUserAuth();
    this.header.isAuth.subscribe(res => {
      this.isAuth = res;
      this.isAuth = this.auth.isUserAuth();
    });
    
    this.cardService.getAllCards().subscribe(res => {
      this.cardsArray = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        data.tempUploadTime = data.uploadTime.split("GMT").shift().split(" ").slice(1, 5).join(" ") || "";
        return data;
      });
      this.tempCardsArray = this.cardsArray;
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

  reactCard(card: CardInterface, icon: HTMLElement) {
    const currentReactUserId = card.reactionUserids.find(id => id === localStorage.getItem('token'));
    if (currentReactUserId) {
      card.reactionUserids = card.reactionUserids.filter(id => id !== localStorage.getItem('token'));
      icon.classList.remove('reacted');
    } else if (localStorage.getItem('token')) {
      card.reactionUserids.push(localStorage.getItem('token') || '');
    }
    this.cardService.updateCard(card);
  }


  isUserReacted(card: CardInterface) {
    return card.reactionUserids.findIndex(id => id === localStorage.getItem('token')) === -1 ? false : true;
  }

  checkCurrentUser(card: CardInterface){
    return card.uploaderAuthor === localStorage.getItem('token') || localStorage.getItem('Gmail') === 'nick.leonidze@gmail.com' ||  localStorage.getItem('Gmail') === 'leonick0111@gmail.com' || localStorage.getItem('Gmail') === 'kdautinishvili@gmail.com'; 
  }

  toggleCards(action: number){
    if (action === 0) {
      this.cardsArray = this.tempCardsArray;
    } else if (action === 1){
      this.cardsArray = this.cardsArray.filter(card => card.uploaderAuthor === localStorage.getItem('token'));
    }
  }

}
