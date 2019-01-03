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
      children: [
        {
          title: I18n.resolve('menu_editor'),
          link: '/logged/venue/editor/0',
        },
        {
          title: I18n.resolve('menu_list'),
          link: '/logged/venue/list',
        },
        {
          title: I18n.resolve('menu_bedroom'),
          group: true,
        },
        {
          title: I18n.resolve('menu_editor'),
          link: '/logged/venue/bedroom/editor/0/0',
        },
        {
          title: I18n.resolve('menu_list'),
          link: '/logged/venue/bedroom/list',
        },
        {
          title: I18n.resolve('menu_classroom'),
          group: true
        },
        {
          title: I18n.resolve('menu_editor'),
          link: '/logged/venue/classroom/editor/0/0',
        },
        {
          title: I18n.resolve('menu_list'),
          link: '/logged/venue/classroom/list',
        }
      ]

    },
    {
      title: I18n.resolve('menu_person'),
      icon: 'nb-person',
      children: [
        {
          title: I18n.resolve('menu_editor'),
          link: '/logged/person/editor/0',
          pathMatch: 'partial'
        },
        {
          title: I18n.resolve('menu_list'),
          link: '/logged/person/list',
        }]

    },
    {
      title: I18n.resolve('menu_school'),
      icon: 'nb-home',
      children: [
        {
          title: I18n.resolve('menu_editor'),
          link: '/logged/school/editor/0',
        },
        {
          title: I18n.resolve('menu_list'),
          link: '/logged/school/list',
        }]

    },
    {
      title: I18n.resolve('menu_event'),
      icon: 'nb-layout-default',
      children: [
        {
          title: I18n.resolve('menu_editor'),
          link: '/logged/event/editor/0'
        },
        {
          title: I18n.resolve('menu_list'),
          link: '/logged/event/list',
        },
        {
          title: I18n.resolve('menu_groups'),
          group: true
        },
        {
          title: I18n.resolve('menu_editor'),
          link: '/logged/event/group/editor/0/0',
        },
        {
          title: I18n.resolve('menu_list'),
          link: '/logged/event/group/list',
        },
        {
          title: I18n.resolve('menu_participant'),
          group: true
        },
        {
          title: I18n.resolve('menu_editor'),
          link: '/logged/event/participant/editor/0/0',
        },
        {
          title: I18n.resolve('menu_list'),
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
      icon: 'nb-close-circled',
      link: '/login/',
    }
  ];

  constructor() {
  }
  ngOnInit() {
  }
}
