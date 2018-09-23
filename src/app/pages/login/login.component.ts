import { Component, OnInit } from '@angular/core';

import { AuthenticationGuard } from './../../guards/authentication/authentication.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  remember = false;

  constructor(private auth: AuthenticationGuard) { }

  ngOnInit() {
  }

  toggleRemember() {
    this.remember = !this.remember;
  }

  login() {
    this.auth.login(this.username, this.password, this.remember);
  }

}
