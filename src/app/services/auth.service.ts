import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { HeaderService } from './header.service';
import { identity } from 'rxjs';
import { stringLength } from '@firebase/util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth, private router: Router, private header: HeaderService) { }

  public login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(res => {
      localStorage.setItem('token', res.user!.uid);
      if (res.user?.emailVerified) {
        this.router.navigateByUrl('/');
        this.header.isAuth.next(true);
      } else {
        this.router.navigateByUrl('/verify-email/info');
      }
    }, err => {
      console.log(err);
      this.router.navigateByUrl('/login');
    });
  }

  public register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(res => {
      this.sendEmailForVerification(res.user);
    }, err => {
      console.log(err);
      this.router.navigateByUrl('/register');
    });
  }

  public logOut() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('Gmail');
      this.router.navigateByUrl('/login');
      this.header.isAuth.next(false);
    }, err => {
      console.log(err);
    })
  }

  public forgotPassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email).then(() => {
      this.router.navigateByUrl('/verify-email/info');
    }, err => {
      console.log(err);
    });
  }

  public sendEmailForVerification(user: any) {
    user.sendEmailVerification().then(() => {
      this.router.navigateByUrl('/verify-email/info');
    }, (err: any) => {
      console.log(err);
    });
  }

  public googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider()).then(res => {
      this.router.navigateByUrl('/');
      const userGmail = res.user!.email;
      localStorage.setItem('Gmail', userGmail || '');
      localStorage.setItem('token', res.user!.uid);
      this.header.isAuth.next(true);
    }, err => {
      console.log(err);
    });
  }

  public isUserAuth(){
    return localStorage.getItem('token')?.length === 28;
  }
}
