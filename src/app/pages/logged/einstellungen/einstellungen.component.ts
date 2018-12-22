import { Component, OnInit } from '@angular/core';
import { EntitySelectSettings } from '@models/componentInput.class';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';

@Component({
  selector: 'app-einstellungen',
  templateUrl: './einstellungen.component.html',
  styleUrls: ['./einstellungen.component.scss']
})
export class EinstellungenComponent implements OnInit {

  public selection_selectedIds: string[] = [];
  public selection_settings: EntitySelectSettings = <EntitySelectSettings>{
    getUrl: 'get/printer/all',
    listNameMembers: ['description'],
    listTitleMembers: ['name'],
    header: 'Drucker',
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
