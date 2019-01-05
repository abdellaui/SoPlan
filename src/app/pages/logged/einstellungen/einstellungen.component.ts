import { Component, OnInit } from '@angular/core';
import { EntitySelectSettings } from '@models/componentInput.class';
import { I18n } from '@models/translation/i18n.class';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';

@Component({
  selector: 'app-einstellungen',
  templateUrl: './einstellungen.component.html',
  styleUrls: ['./einstellungen.component.scss']
})
export class EinstellungenComponent implements OnInit {

  public selection_selectedIds: string[] = [];
  public _i18n = I18n;

  public selection_settings: EntitySelectSettings = <EntitySelectSettings>{
    getUrl: 'get/printer/all',
    listNameMembers: ['description'],
    listTitleMembers: ['name'],
    header: I18n.resolve('settings_printer'),
    maxSelection: 1,
    showCreateButton: false
  };

  constructor(private ipc: IpcRendererService) {
    this.ipc.get('get/printer').then((result: any) => {
      if (result) {
        this.selection_selectedIds = [result];
      }
    });
  }

  ngOnInit() {
  }

  printerSelected(event: any) {
    const selection = (event && event.length) ? event[0] : null;
    if (selection) {
      this.ipc.send('post/printer', selection);
    }
  }


}
