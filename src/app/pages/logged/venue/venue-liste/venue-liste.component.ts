import { Component, OnInit } from '@angular/core';
import { Communication, CommunicationSchema } from '@entity/_communication/communicaton.entity';
import { Location, LocationSchema } from '@entity/_location/location.entity';
import { Venue, VenueSchema } from '@entity/venue/venue.entity';
import { SmartTableConfig } from '@models/componentInput.class';

@Component({
  selector: 'app-venue-liste',
  templateUrl: './venue-liste.component.html',
  styleUrls: ['./venue-liste.component.scss']
})
export class VenueListeComponent implements OnInit {
  public st_config: SmartTableConfig = {
    settings: {
      header: 'Ortsliste',
      showCreateButton: true,
      createButtonText: 'Neue Ort'
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
