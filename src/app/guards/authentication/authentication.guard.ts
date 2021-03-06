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
import { I18n } from '@models/translation/i18n.class';

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
    const currAdmin = Object.assign(new AdminLogin(), admin); // copy
    currAdmin.password = window.btoa(admin.password);

    this.ipc.get('get/administrator/auth', currAdmin).then((result: any) => {
      if (result) {
        result.remember = _remember;
        localStorage.setItem('administrator', JSON.stringify(result));
        this.toastr.success(I18n.resolve('login_success'));
        this.router.navigate(['/logged']);
      } else {
        this.toastr.error(I18n.resolve('login_error'));
      }
    });
  }

  logout(): void {
    localStorage.removeItem('administrator');
    this.router.navigate(['/auth/login']);
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
      this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
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
      this.router.navigate(['/auth/login'], { queryParams: { returnUrl: route.path } });
      return false;
    }
  }
}
