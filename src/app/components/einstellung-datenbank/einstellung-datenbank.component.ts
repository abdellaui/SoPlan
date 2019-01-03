import { Component, OnInit } from '@angular/core';
import { DatabaseConfig, DatabaseConfigSchema } from '@models/configs.class';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { ToastrService } from 'ngx-toastr';
import { I18n } from '@models/translation/i18n.class';

@Component({
  selector: 'app-einstellung-datenbank',
  templateUrl: './einstellung-datenbank.component.html',
  styleUrls: ['./einstellung-datenbank.component.scss']
})
export class EinstellungDatenbankComponent implements OnInit {



  public loadingFinished = false;
  public config: DatabaseConfig = new DatabaseConfig();
  public form_schema = DatabaseConfigSchema;
  public form_settings = { header: I18n.resolve('config_db'), buttons: true };

  constructor(private ipc: IpcRendererService, private toastr: ToastrService) {

  }

  setConfig(config: DatabaseConfig): void {

    if (config) {
      this.config = Object.assign(this.config, config);
    }
    this.loadingFinished = true;
  }

  saveConfig(): void {
    this.ipc.send('post/database/config', this.config);
    this.toastr.info(I18n.resolve('config_db_restart'), I18n.resolve('config_db_success'));
  }

  ngOnInit() {
    this.ipc.get('get/database/config').then((result: DatabaseConfig) => {
      this.setConfig(result);
    });
  }

}
