import { Component } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { User } from '@entity/user/user.entity';
import { validate } from 'class-validator';
import { IpcRendererService } from './services/ipcRenderer.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(private sidebarService: NbSidebarService, private ipc: IpcRendererService) {
    this.ipc.on('entity/user/create', (event: any, arg: User) => {
      console.log('client', arg, typeof arg);
    });
  }

  public toggle(): boolean {


    const testUser = new User();
    testUser.firstName = 'world';
    testUser.lastName = 'helloworld';
    testUser.age = 12;

    validate(testUser).then(errors => { // errors: ValidatorError[]
      if (errors.length > 0) {
        console.log('error found', errors);
      } else {
        console.log('valide!');
      }

    });

    const testUser2 = new User();
    testUser2.firstName = 'it';
    testUser2.lastName = 'works';
    testUser2.age = 1222;


    console.log([testUser, testUser2]);
    this.ipc.send('entity/user/create', [testUser, testUser2]);


    this.sidebarService.toggle(true);
    return false;
  }
}
