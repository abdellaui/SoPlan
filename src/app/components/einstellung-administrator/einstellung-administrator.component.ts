import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { IpcRendererService } from '../../services/ipc-renderer/ipc-renderer.service';
import { AuthenticationGuard } from './../../guards/authentication/authentication.guard';


@Component({
  selector: 'app-einstellung-administrator',
  templateUrl: './einstellung-administrator.component.html',
  styleUrls: ['./einstellung-administrator.component.scss']
})
export class EinstellungAdministratorComponent implements OnInit {


  private secret: string;
  username: string;
  password: string;
  newpsw: string;
  newpsw2: string;

  constructor(private ipc: IpcRendererService, private toastr: ToastrService, private auth: AuthenticationGuard) {
  }
  private setConfig(config: any): void {
    console.log('setConfig', config);
    if (config) {
      this.username = config.username;
      this.secret = config.password;

      // restore
      this.password = '**********';
      this.newpsw = this.password;
      this.newpsw2 = this.password;
    }
  }
  saveConfig(): void {

    if (this.secret !== this.password) {
      this.toastr.error('Aktuelles Passwort ist falsch!');
      return;
    }
    if (this.newpsw !== this.newpsw2) {
      this.toastr.error('Passwörter stimmen nicht überein!');
      return;
    }
    if (this.newpsw.length < 5) {
      this.toastr.error('Passwort muss mind. 5 Zeichen enthalten!');
      return;
    }
    if (this.username.length < 3) {
      this.toastr.error('Benutzername muss mind. 3 Zeichen enthalten!');
      return;
    }
    this.ipc.send('post/administrator', { username: this.username, password: this.newpsw });
    this.toastr.info('Ihre Benutzerdaten sind ab der nächsten Sitzung aktiv!', 'Erfolgreich gespeichert!');
    this.auth.logout();
  }

  ngOnInit() {
    this.ipc.get('get/administrator').then((result: any) => {
      this.setConfig(result);
    });
  }

}
