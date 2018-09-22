import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { IpcRendererService } from '../../services/ipc-renderer/ipc-renderer.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseGuard implements CanActivate {

  private resolve: Subject<boolean> = new Subject<boolean>();

  constructor(private router: Router, private toastr: ToastrService, private ipc: IpcRendererService) {

    this.ipc.on('get/database/connection', (event: any, arg: any) => {
      this.resolve.next(arg);
    });

  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    this.ipc.send('get/database/connection');

    return this.resolve.pipe(map((next: boolean) => {
      if (next) {
        return true;
      } else {
        this.toastr.error('Bitte zuerst Datenbankverbindung konfigurieren!');
        this.router.navigate(['databaseConnection'], { queryParams: { returnUrl: state.url } });
        return false;
      }
    }));
  }
}
