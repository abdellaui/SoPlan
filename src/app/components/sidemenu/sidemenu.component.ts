import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { I18n } from '@models/translation/i18n.class';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-sidemenu',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {
  items: NbMenuItem[] = [
    {
      title: I18n.resolve('menu_dashboard'),
      icon: 'nb-grid-a-outline',
      link: '/logged/dashboard',
      home: true,
    },
    {
      title: I18n.resolve('menu_location'),
      icon: 'nb-location',
      expanded: false,
      children: [
        {
          title: I18n.resolve('menu_location'),
          link: '/logged/venue/list',
        },
        {
          title: I18n.resolve('menu_bedroom'),
          link: '/logged/venue/bedroom/list',
        },
        {
          title: I18n.resolve('menu_classroom'),
          link: '/logged/venue/classroom/list',
        }
      ]

    },
    {
      title: I18n.resolve('menu_person'),
      icon: 'nb-person',
      link: '/logged/person/list'
    },
    {
      title: I18n.resolve('menu_school'),
      icon: 'nb-home',
      link: '/logged/school/list',

    },
    {
      title: I18n.resolve('menu_event'),
      icon: 'nb-layout-default',
      expanded: false,
      children: [
        {
          title: I18n.resolve('menu_event'),
          link: '/logged/event/list',
        },
        {
          title: I18n.resolve('menu_groups'),
          link: '/logged/event/group/list',
        },
        {
          title: I18n.resolve('menu_participant'),
          link: '/logged/event/participant/list',
        }
      ]
    },
    {
      title: I18n.resolve('menu_settings'),
      icon: 'nb-gear',
      link: '/logged/einstellungen',
    },
    {
      title: I18n.resolve('menu_logout'),
      icon: 'nb-power',
      link: '/auth/logout',
    }
  ];

  constructor() {
  }
  ngOnInit() {
  }
}
