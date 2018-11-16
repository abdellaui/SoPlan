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
      title: 'Orte',
      icon: 'nb-location',
      children: [
        {
          title: 'Editor',
          link: '/logged/venue/editor/0',
        },
        {
          title: 'Liste',
          link: '/logged/person/list',
        }]

    },
    {
      title: 'Person',
      icon: 'nb-person',
      children: [
        {
          title: 'Editor',
          link: '/logged/person/editor/0',
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
          link: '/logged/person/list',
        }]

    },

    {
      title: 'Veranstaltung',
      icon: 'nb-layout-default',
      children: [
        {
          title: 'Editor',
          link: '/logged/school/editor/0',
        },
        {
          title: 'Liste',
          link: '/logged/person/list',
        }]

    }
  ];

  constructor(private currentEventService: CurrentEventService) {
    this.currentEventService.currentEventChanged.subscribe((event: Event) => {
      if (event) {
        this.items.push({
          title: 'Einstellungen',
          icon: 'nb-gear',
          link: '/logged/einstellungen',
          home: true
        });
      }
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
