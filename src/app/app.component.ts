import { Component } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';

import { IpcRendererService } from './services/ipc-renderer/ipc-renderer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(private sidebarService: NbSidebarService, private ipc: IpcRendererService) {
  }

  public toggle(): boolean {
    this.sidebarService.toggle(true);
    return false;
  }
}
