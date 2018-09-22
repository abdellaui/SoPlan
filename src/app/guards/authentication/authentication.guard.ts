import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { IpcRendererService } from './../../services/ipc-renderer/ipc-renderer.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private router: Router,
    private toastr: ToastrService,
    private ipc: IpcRendererService) {

    const admin = JSON.parse(localStorage.getItem('administrator'));
    if (admin && !admin.remember) {
      this.logout();
    }
  }

  login(_username: string, _password: string, _remember: boolean) {

    this.ipc.init('check/administrator', (event: any, arg: any) => {
      if (arg) {
        arg.remember = _remember;
        localStorage.setItem('administrator', JSON.stringify(arg));
        this.toastr.success('Erfolgreich angemeldet!');
        this.router.navigate(['logged']);
      } else {
        this.toastr.error('Anmeldedaten falsch!');
      }
    }, { username: _username, password: _password });
  }

  logout() {
    localStorage.removeItem('administrator');
    this.router.navigate(['login']);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('administrator')) {
      return true;
    } else {

      this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }


}
