import { Component, OnInit } from '@angular/core';
import { I18n } from '@models/translation/i18n.class';

@Component({
  selector: 'app-database-connection',
  templateUrl: './database-connection.component.html',
  styleUrls: ['./database-connection.component.scss']
})
export class DatabaseConnectionComponent implements OnInit {

  public _i18n = I18n;
  constructor() { }

  ngOnInit() {
  }

}
