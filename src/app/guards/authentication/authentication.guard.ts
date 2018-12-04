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
import { AdminLogin } from '@models/configs.class';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { ToastrService } from 'ngx-toastr';

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

  login(admin: AdminLogin, _remember: boolean): void {
    const currAdmin = admin;
    currAdmin.password = window.btoa(admin.password);

    this.ipc.get('check/administrator', currAdmin).then((result: any) => {
      if (result) {
        result.remember = _remember;
        localStorage.setItem('administrator', JSON.stringify(result));
        this.toastr.success('Erfolgreich angemeldet!');
        this.router.navigate(['/logged']);
      } else {
        this.toastr.error('Anmeldedaten falsch!');
      }
    });
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
    if (this.hasRight()) {
      return true;
    } else {
      this.router.navigate(['/login'], { queryParams: { returnUrl: route.path } });
      return false;
    }
  }
}
