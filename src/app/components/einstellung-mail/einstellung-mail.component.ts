import { Component, OnInit } from '@angular/core';
import { MailConfig, MailConfigSchema } from '@models/configs.class';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { ToastrService } from 'ngx-toastr';
import { I18n } from '@models/translation/i18n.class';

@Component({
  selector: 'app-einstellung-mail',
  templateUrl: './einstellung-mail.component.html',
  styleUrls: ['./einstellung-mail.component.scss']
})
export class EinstellungMailComponent implements OnInit {

  public loadingFinished = false;
  public config: MailConfig = new MailConfig();
  public form_schema = MailConfigSchema;
  public form_settings = { header: I18n.resolve('config_mail'), buttons: true };


  constructor(private ipc: IpcRendererService, private toastr: ToastrService) { }

  setConfig(config: MailConfig): void {
    if (config) {
      this.config = Object.assign(this.config, config);
    }
    this.loadingFinished = true;
  }

  saveConfig(): void {
    this.ipc.send('post/mail/config', this.config);
    this.toastr.info(I18n.resolve('toastr_SMTP_success'));
  }

  ngOnInit() {
    this.ipc.get('get/mail/config').then((result: MailConfig) => {
      this.setConfig(result);
    });
  }

}
