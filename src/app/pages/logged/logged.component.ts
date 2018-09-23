import { Component, OnInit } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.scss']
})
export class LoggedComponent implements OnInit {

  constructor(private sidebarService: NbSidebarService) { }

  ngOnInit() {
  }

  public toggle(): boolean {
    this.sidebarService.toggle(true);
    return false;
  }
}
