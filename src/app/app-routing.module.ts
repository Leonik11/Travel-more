import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthedGuard, AuthGuard } from './guards';
import { HomeComponent, LoginComponent, NotfoundComponent, RegisterComponent, ResetPasswordComponent, UpdateCardComponent, VerifyEmailInfoComponent } from './views';
import { ApartmentComponent } from './views/apartment/apartment.component';
import { BookingComponent } from './views/booking/booking.component';
import { CreateCardComponent } from './views/create-card/create-card.component';
import { CreateRoomComponent } from './views/create-room/create-room.component';
import { PaymentComponent } from './views/payment/payment.component';
import { UpdateRoomComponent } from './views/update-room/update-room.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'payment',
    component: PaymentComponent,
    canActivate: [AuthedGuard]
  },
  {
    path: 'booking/:id',
    component: BookingComponent,
    canActivate: [AuthedGuard]
  },
  {
    path: 'apartment/:id',
    component: ApartmentComponent
  },
  {
    path: 'update-room/:id',
    component: UpdateRoomComponent,
    canActivate: [AuthedGuard]
  },
  {
    path: 'createroom/:id',
    component: CreateRoomComponent,
    canActivate: [AuthedGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'verify-email/info',
    component: VerifyEmailInfoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create-card',
    component: CreateCardComponent,
    canActivate: [AuthedGuard]
  },
  {
    path: 'update-card/:id',
    component: UpdateCardComponent,
    canActivate: [AuthedGuard]
  },
  {
    path: '404',
    component: NotfoundComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
