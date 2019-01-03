import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { ToastrService } from 'ngx-toastr';
import { I18n } from '@models/translation/i18n.class';

@Injectable({
  providedIn: 'root'
})
export class DatabaseGuard implements CanActivate {


  constructor(private router: Router, private toastr: ToastrService, private ipc: IpcRendererService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.ipc.get('get/database/connection').then((next: boolean) => {
      if (next) {
        localStorage.setItem('databaseConnection', 'true');
        return true;
      } else {
        localStorage.removeItem('databaseConnection');
        this.toastr.error(I18n.resolve('toastr_configure_database_first'));
        this.router.navigate(['/databaseConnection'], { queryParams: { returnUrl: state.url } });
        return false;
      }
    });
  }
}
