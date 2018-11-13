import { Component, OnInit } from '@angular/core';
import { MailConfig } from '@models/configs.class';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { validate } from 'class-validator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-einstellung-mail',
  templateUrl: './einstellung-mail.component.html',
  styleUrls: ['./einstellung-mail.component.scss']
})
export class EinstellungMailComponent implements OnInit {

  formSchema: any = [
    { name: 'Host', member: 'host', type: 'text' },
    { name: 'Port', member: 'port', type: 'text' },
    { name: 'Username', member: 'user', type: 'text' },
    { name: 'Password', member: 'pass', type: 'password' }
  ];

  config: MailConfig = new MailConfig();

  constructor(private ipc: IpcRendererService, private toastr: ToastrService) { }

  setConfig(config: MailConfig): void {
    if (config) {
      this.config = Object.assign(this.config, config);
    }
  }

  saveConfig(): void {

    validate(this.config).then(errors => {
      if (errors.length > 0) {
        this.toastr.error(`Fehler: ${JSON.stringify(errors)}`);
      } else {
        this.ipc.send('post/mail/config', this.config);
        this.toastr.info('SMTP-Daten wurde erfolgreich konfiguriert!');
      }
    });
  }


  ngOnInit() {
    this.ipc.get('get/mail/config').then((result: MailConfig) => {
      this.setConfig(result);
    });
  }

}
