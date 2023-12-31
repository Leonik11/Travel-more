import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  email: string = "";
  password: string = "";
  id: string = "";
  fullName: string = "";

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  public register(){
    if (this.email && this.password && this.id && this.fullName){
      this.auth.register(this.email,this.password);
    }
  }

}
