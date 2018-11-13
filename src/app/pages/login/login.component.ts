import { Component, OnInit } from '@angular/core';
import { AuthenticationGuard } from '@guards/authentication/authentication.guard';
import { AdminLogin } from '@models/configs.class';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  admin: AdminLogin = new AdminLogin();
  remember = false;

  constructor(private auth: AuthenticationGuard) { }

  ngOnInit() {
  }

  toggleRemember() {
    this.remember = !this.remember;
  }

  login() {
    this.auth.login(this.admin, this.remember);
  }

}
