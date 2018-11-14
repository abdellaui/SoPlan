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
      title: 'Veranstaltungen',
      icon: 'nb-paper-plane',
      link: '/logged/veranstaltungen'
    },
    {
      title: 'Person-Editor',
      icon: 'nb-person',
      link: '/logged/person/editor/0'
    },
    {
      title: 'Person-Liste',
      icon: 'nb-list',
      link: '/logged/person/list'
    },
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
