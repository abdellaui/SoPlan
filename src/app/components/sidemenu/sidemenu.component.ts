import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-sidemenu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {

  items: NbMenuItem[] = [
    {
      title: 'Einstellungen',
      icon: 'nb-gear',
      link: '/logged/einstellungen',
      home: true
    }
  ];

  constructor() { }

  ngOnInit() {
  }
}
