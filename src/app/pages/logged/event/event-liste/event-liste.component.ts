import { Component, OnInit } from '@angular/core';
import { Event, EventSchema } from '@entity/event/event.entity';
import { Venue, VenueSchema } from '@entity/venue/venue.entity';
import { SmartTableConfig } from '@models/componentInput.class';
import { CurrentEventService } from '@services/current-event/current-event.service';
import { I18n } from '@models/translation/i18n.class';

@Component({
  selector: 'app-event-liste',
  templateUrl: './event-liste.component.html',
  styleUrls: ['./event-liste.component.scss']
})
export class EventListeComponent implements OnInit {
  public st_config: SmartTableConfig = {
    settings: {
      header: I18n.resolve('event_list'),
      showCreateButton: true,
      createButtonText: I18n.resolve('event_new_event')
    },
    slotUrls: {
      getUrl: 'get/event/all',
      postUrl: 'post/event',
      deleteUrl: 'delete/event',
      editorUrl: '/logged/event/editor/'
    },
    instanceMap: {
      '': Event.prototype,
      'hosting@': Venue.prototype
    },
    memberList: [
      {
        prefix: '',
        schema: EventSchema,
        members: [
          'name',
          'startsDate',
          'endsDate'
        ],
      },
      {
        prefix: 'hosting@',
        schema: VenueSchema,
        members: ['name'],
        extendedSettings: {
          name: { editable: false }
        }
      },

    ]
  };
  constructor(private currentEventService: CurrentEventService) { }

  ngOnInit() {
  }

  onChange(): void {
    this.currentEventService.refreshEvents();
  }

}
