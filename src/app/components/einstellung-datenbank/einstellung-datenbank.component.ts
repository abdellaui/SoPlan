import { Component, OnInit } from '@angular/core';
import { DatabaseConfig } from '@models/configs.class';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { validate } from 'class-validator';
import { ToastrService } from 'ngx-toastr';

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

  config: DatabaseConfig = new DatabaseConfig();

  constructor(private ipc: IpcRendererService, private toastr: ToastrService) {

  }

  private setConfig(config: DatabaseConfig): void {
    if (config) {
      this.config = Object.assign(this.config, config);
    }
  }

  saveConfig(): void {
    validate(this.config).then(errors => {
      if (errors.length > 0) {
        this.toastr.error(`Fehler: ${JSON.stringify(errors)}`);
      } else {
        this.ipc.send('post/database/config', this.config);
        this.toastr.info('Konfiguration erfordert Neustart!', 'Erfolgreich gespeichert!');
      }
    });
  }

  ngOnInit() {
    this.ipc.get('get/database/config').then((result: DatabaseConfig) => {
      this.setConfig(result);
    });
  }

}
