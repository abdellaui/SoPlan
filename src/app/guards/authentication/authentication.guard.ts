import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { IpcRendererService } from './../../services/ipc-renderer/ipc-renderer.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private router: Router,
    private toastr: ToastrService,
    private ipc: IpcRendererService) {

    const admin = JSON.parse(localStorage.getItem('administrator'));
    if (admin && !admin.remember) {
      this.logout();
    }
  }

  login(_username: string, _password: string, _remember: boolean): void {

    this.ipc.init('check/administrator', (event: any, arg: any) => {
      if (arg) {
        arg.remember = _remember;
        localStorage.setItem('administrator', JSON.stringify(arg));
        this.toastr.success('Erfolgreich angemeldet!');
        this.router.navigate(['/logged']);
      } else {
        this.toastr.error('Anmeldedaten falsch!');
      }
    }, { username: _username, password: _password });
  }

  logout(): void {
    localStorage.removeItem('administrator');
    this.router.navigate(['/login']);
  }

  hasRight(): boolean {
    return (
      localStorage.getItem('administrator')
      && localStorage.getItem('databaseConnection')
    ) ? true : false;
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.hasRight()) {
      return true;
    } else {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(childRoute, state);
  }

  canLoad(route: Route): boolean {
    console.log(route);
    if (this.hasRight()) {
      return true;
    } else {
      this.router.navigate(['/login'], { queryParams: { returnUrl: route.path } });
      return false;
    }
  }
}
