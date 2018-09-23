import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { IpcRendererService } from '../../services/ipc-renderer/ipc-renderer.service';

@Component({
  selector: 'app-einstellung-datenbank',
  templateUrl: './einstellung-datenbank.component.html',
  styleUrls: ['./einstellung-datenbank.component.scss']
})
export class EinstellungDatenbankComponent implements OnInit {

  formSchema: any = [
    { name: 'Host', member: 'host' },
    { name: 'Port', member: 'port' },
    { name: 'Username', member: 'username' },
    { name: 'Password', member: 'password' },
    { name: 'Database', member: 'database' },
  ];

  config: any = {
    host: '',
    port: '',
    username: '',
    password: '',
    database: ''
  };

  constructor(private ipc: IpcRendererService, private toastr: ToastrService) {

  }

  private setConfig(config: any): void {
    if (config) {
      this.config = config;
    }
  }
  saveConfig(): void {
    this.ipc.send('post/database/config', this.config);
    this.toastr.info('Konfiguration erfordert Neustart!', 'Erfolgreich gespeichert!');
  }

  ngOnInit() {
    this.ipc.get('get/database/config').then((result: any) => {
      this.setConfig(result);
    });
  }

}
