import { Component, OnInit } from '@angular/core';
import { MailConfig } from '@models/mailConfig.class';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
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

  config: MailConfig = {
    host: '',
    port: '',
    user: '', // username
    pass: '' // password
  };

  constructor(private ipc: IpcRendererService, private toastr: ToastrService) { }

  setConfig(config: MailConfig): void {
    if (config) {
      this.config = config;
    }
  }

  saveConfig(): void {
    this.ipc.send('post/mail/config', this.config);
    this.toastr.info('Mail wurde erfolgreich konfiguriert!');
  }


  ngOnInit() {
    this.ipc.get('get/mail/config').then((result: MailConfig) => {
      this.setConfig(result);
    });
  }

}
