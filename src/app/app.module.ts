import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

import { HomeComponent, LoginComponent, NotfoundComponent, RegisterComponent, ResetPasswordComponent } from './views';
import { HeaderComponent } from './shared';
import { CreateCardComponent } from './views/create-card/create-card.component';
import { UpdateCardComponent } from './views/update-card/update-card.component';
import { CreateRoomComponent } from './views/create-room/create-room.component';
import { ApartmentComponent } from './views/apartment/apartment.component';
import { UpdateRoomComponent } from './views/update-room/update-room.component';
import { BookingComponent } from './views/booking/booking.component';
import { PaymentComponent } from './views/payment/payment.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotfoundComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    HeaderComponent,
    CreateCardComponent,
    UpdateCardComponent,
    CreateRoomComponent,
    ApartmentComponent,
    UpdateRoomComponent,
    BookingComponent,
    PaymentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
