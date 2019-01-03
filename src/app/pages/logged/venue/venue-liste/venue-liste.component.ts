import { Component, OnInit } from '@angular/core';
import { Communication, CommunicationSchema } from '@entity/_communication/communicaton.entity';
import { Location, LocationSchema } from '@entity/_location/location.entity';
import { Venue, VenueSchema } from '@entity/venue/venue.entity';
import { SmartTableConfig } from '@models/componentInput.class';
import { I18n } from '@models/translation/i18n.class';

@Component({
  selector: 'app-venue-liste',
  templateUrl: './venue-liste.component.html',
  styleUrls: ['./venue-liste.component.scss']
})
export class VenueListeComponent implements OnInit {
  public st_config: SmartTableConfig = {
    settings: {
      header: I18n.resolve('venue_list'),
      showCreateButton: true,
      createButtonText: I18n.resolve('venue_new_venue')
    },
    slotUrls: {
      getUrl: 'get/venue/all',
      postUrl: 'post/venue',
      deleteUrl: 'delete/venue',
      editorUrl: '/logged/venue/editor/'
    },
    instanceMap: {
      '': Venue.prototype,
      'location': Location.prototype,
      'communication': Communication.prototype
    },
    memberList: [
      {
        prefix: '',
        schema: VenueSchema,
        members: [
          'name',
          'contactPerson'
        ]
      },
      {
        prefix: 'location@',
        schema: LocationSchema,
        members: ['street', 'city']
      },
      {
        prefix: 'communication@',
        schema: CommunicationSchema,
        members: ['phone', 'mail', 'mobile']
      }
    ]
  };
  constructor() { }

  ngOnInit() {
  }

}
