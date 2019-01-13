import { Component, OnInit } from '@angular/core';
import { AuthenticationGuard } from '@guards/authentication/authentication.guard';
import { AdminLogin } from '@models/configs.class';
import { I18n } from '@models/translation/i18n.class';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-einstellung-administrator',
  templateUrl: './einstellung-administrator.component.html',
  styleUrls: ['./einstellung-administrator.component.scss']
})
export class EinstellungAdministratorComponent implements OnInit {


  public _i18n = I18n;
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
      this.toastr.error(I18n.resolve('toastr_password_error'));
      return;
    }
    if (this.newpsw !== this.newpsw2) {
      this.toastr.error(I18n.resolve('toastr_password_do_not_match'));
      return;
    }
    if (this.newpsw.length < 5) {
      this.toastr.error(I18n.resolve('toastr_password_short'));
      return;
    }
    if (this.username.length < 3) {
      this.toastr.error(I18n.resolve('toastr_username_short'));
      return;
    }
    this.ipc.send('post/administrator', <AdminLogin>{ username: this.username, password: window.btoa(this.newpsw) });
    this.toastr.info(I18n.resolve('toastr_userdata_saved_for_next_session'), I18n.resolve('toastr_save_success'));
    this.auth.logout();
  }

  ngOnInit() {
    this.ipc.get('get/administrator').then((result: AdminLogin) => {
      this.setConfig(result);
    });
  }

}
