import { Component, OnInit, OnDestroy } from '@angular/core';
import { IpcRendererService } from '../../services/ipcRenderer.service';

@Component({
  selector: 'app-einstellungen',
  templateUrl: './einstellungen.component.html',
  styleUrls: ['./einstellungen.component.scss']
})
export class EinstellungenComponent implements OnInit, OnDestroy {


  message: string = null;

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

  constructor(private ipc: IpcRendererService) {

  }

  private setConfig(config: any): void {
    if (config) {
      this.config = config;
    }
  }
  saveConfig(): void {
    this.ipc.send('post/database/config', this.config);
    this.message = 'Konfiguration erfordert Neustart!';
  }

  ngOnInit() {
    this.ipc.send('get/database/config');
    this.ipc.on('get/database/config', (event: any, arg: any) => {
      this.setConfig(arg);
    });
  }

  ngOnDestroy() {
    this.ipc.remove();
  }

}
