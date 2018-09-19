import { Component } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { User } from '@entity/user/user.entity';
import { validate } from 'class-validator';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(private sidebarService: NbSidebarService) {

  }

  public toggle(): boolean {


    const testUser = new User();
    testUser.firstName = 'world';
    validate(testUser).then(errors => { // errors is an array of validation errors
      if (errors.length > 0) {
        console.log('validation failed. errors: ', errors);
      } else {
        console.log('validation succeed');
      }
      console.log(testUser);
    });


    this.sidebarService.toggle(true);
    return false;
  }
}
