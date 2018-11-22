import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Event } from '@entity/event/event.entity';
import { NbMenuItem } from '@nebular/theme';
import { CurrentEventService } from '@services/current-event/current-event.service';

@Component({
  selector: 'app-sidemenu',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
              link: '/logged/venue/classroom/editor/0/1',
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
        }]
    },
    {
      title: 'Certificate',
      icon: 'nb-lightbulb',
      link: '/logged/certificate',
    }
  ];


  constructor(private currentEventService: CurrentEventService) {
    this.currentEventService.currentEventChanged.subscribe((event: Event) => {
      // TODO: if event is selected than show more menu items
    });


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
