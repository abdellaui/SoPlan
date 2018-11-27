import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
      title: 'Ort',
      icon: 'nb-location',
      children: [
        {
          title: 'Editor',
          link: '/logged/venue/editor/0',
        },
        {
          title: 'Liste',
          link: '/logged/venue/list',
        },
        {
          title: 'Schlafzimmer',
          children: [
            {
              title: 'Editor',
              link: '/logged/venue/bedroom/editor/0/0',
            },
            {
              title: 'Liste',
              link: '/logged/venue/bedroom/list',
            }
          ],
        },
        {
          title: 'Klassenzimmer',
          children: [
            {
              title: 'Editor',
              link: '/logged/venue/classroom/editor/0/0',
            },
            {
              title: 'Liste',
              link: '/logged/venue/classroom/list',
            }
          ],
        },
      ]

    },
    {
      title: 'Person',
      icon: 'nb-person',
      children: [
        {
          title: 'Editor',
          link: '/logged/person/editor/0'
        },
        {
          title: 'Liste',
          link: '/logged/person/list',
        }]

    },
    {
      title: 'Schule',
      icon: 'nb-home',
      children: [
        {
          title: 'Editor',
          link: '/logged/school/editor/0',
        },
        {
          title: 'Liste',
          link: '/logged/school/list',
        }]

    },
    {
      title: 'Veranstaltung',
      icon: 'nb-layout-default',
      children: [
        {
          title: 'Editor',
          link: '/logged/event/editor/0'
        },
        {
          title: 'Liste',
          link: '/logged/event/list',
        },
        {
          title: 'Gruppen',
          children: [
            {
              title: 'Editor',
              link: '/logged/event/group/editor/0/0',
            },
            {
              title: 'Liste',
              link: '/logged/event/group/list',
            }
          ],
        },
        {
          title: 'Teilnehmer',
          children: [
            {
              title: 'Editor',
              link: '/logged/event/participant/editor/0/0',
            },
            {
              title: 'Liste',
              link: '/logged/event/participant/list',
            }
          ],
        },
      ]
    },
    {
      title: 'Certificate',
      icon: 'nb-lightbulb',
      link: '/logged/certificate',
    }
  ];


  constructor() {


    this.items.push({
      title: 'Einstellungen',
      icon: 'nb-gear',
      link: '/logged/einstellungen',
      home: true

    });
  }
  ngOnInit() {
  }
}
