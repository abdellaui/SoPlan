import { Component, OnInit } from '@angular/core';
import { AuthenticationGuard } from '@guards/authentication/authentication.guard';
import { AdminLogin } from '@models/configs.class';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { ToastrService } from 'ngx-toastr';

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
  setConfig(config: AdminLogin): void {

    if (config) {
      this.username = config.username;
      this.secret = config.password;

      // restore
      const stars = '**********';
      this.password = stars + '1';
      this.newpsw = stars + '2';
      this.newpsw2 = stars + '3';
    }

  }
  saveConfig(): void {

    // window.btoa(string) => base64.encode(string)

    if (this.secret !== window.btoa(this.password)) {
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
    this.ipc.send('post/administrator', <AdminLogin>{ username: this.username, password: window.btoa(this.newpsw) });
    this.toastr.info('Ihre Benutzerdaten sind ab der nächsten Sitzung aktiv!', 'Erfolgreich gespeichert!');
    this.auth.logout();
  }

  ngOnInit() {
    this.ipc.get('get/administrator').then((result: AdminLogin) => {
      this.setConfig(result);
    });
  }

}
