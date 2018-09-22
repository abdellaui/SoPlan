import { Component } from '@angular/core';
import { User } from '@entity/user/user.entity';
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
        const user = new User();
        user.firstName = (new Date()).toString();
        user.lastName = 'new';
        user.age = 12;

        this.ipc.send('entity/user/create', [user]);
        this.sidebarService.toggle(true);
        return false;
    }
}
