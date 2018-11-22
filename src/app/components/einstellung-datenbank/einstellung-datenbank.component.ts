import { Component, OnInit } from '@angular/core';
import { DatabaseConfig, DatabaseConfigSchema } from '@models/configs.class';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-einstellung-datenbank',
  templateUrl: './einstellung-datenbank.component.html',
  styleUrls: ['./einstellung-datenbank.component.scss']
})
export class EinstellungDatenbankComponent implements OnInit {



  public loadingFinished = false;
  public config: DatabaseConfig = new DatabaseConfig();
  public form_schema = DatabaseConfigSchema;
  public form_settings = { header: 'Datenbank konfiguration', buttons: true };

  constructor(private ipc: IpcRendererService, private toastr: ToastrService) {

  }

  private setConfig(config: DatabaseConfig): void {

    if (config) {
      this.config = Object.assign(this.config, config);
    }
    this.loadingFinished = true;
  }

  saveConfig(): void {
    this.ipc.send('post/database/config', this.config);
    this.toastr.info('Konfiguration erfordert Neustart!', 'Erfolgreich gespeichert!');
  }

  ngOnInit() {
    this.ipc.get('get/database/config').then((result: DatabaseConfig) => {
      this.setConfig(result);
    });
  }

}
