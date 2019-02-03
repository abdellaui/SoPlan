import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationGuard } from '@guards/authentication/authentication.guard';
import { AdminLogin } from '@models/configs.class';
import { I18n } from '@models/translation/i18n.class';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public _i18n = I18n;
  admin: AdminLogin = new AdminLogin();
  remember = true;

  constructor(private auth: AuthenticationGuard, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params && params['method'] && params['method'] === 'logout') {
        this.auth.logout();
      }
    });
  }

  toggleRemember() {
    this.remember = !this.remember;
  }

  login() {
    this.auth.login(this.admin, this.remember);
  }

}
