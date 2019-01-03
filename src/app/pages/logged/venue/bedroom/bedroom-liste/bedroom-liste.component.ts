import { Component, OnInit } from '@angular/core';
import { Room, RoomSchema } from '@entity/_room/room.entity';
import { Bedroom, BedroomSchema } from '@entity/bedroom/bedroom.entity';
import { Venue, VenueSchema } from '@entity/venue/venue.entity';
import { SmartTableConfig } from '@models/componentInput.class';
import { I18n } from '@models/translation/i18n.class';

@Component({
  selector: 'app-bedroom-liste',
  templateUrl: './bedroom-liste.component.html',
  styleUrls: ['./bedroom-liste.component.scss']
})
export class BedroomListeComponent implements OnInit {
  public st_config: SmartTableConfig = {
    settings: {
      header: I18n.resolve('bedroom_list'),
      showCreateButton: true,
      createButtonText: I18n.resolve('bedroom_new_bedroom')
    },
    slotUrls: {
      getUrl: 'get/bedroom/all',
      postUrl: 'post/bedroom',
      deleteUrl: 'delete/bedroom',
      editorUrl: '/logged/venue/bedroom/editor/0/'
    },
    instanceMap: {
      '': Bedroom.prototype,
      'room': Room.prototype,
      'venue': Venue.prototype,
    },
    memberList: [
      {
        prefix: '',
        schema: BedroomSchema,
        members: ['type']
      },
      {
        prefix: 'room@',
        schema: RoomSchema,
        members: ['floor', 'corridor', 'number', 'name', 'capacity']
      },
      {
        prefix: 'venue@',
        schema: VenueSchema,
        members: ['name'],
        extendedSettings: {
          name: {
            editable: false
          }
        }
      }
    ]
  };
  constructor() { }

  ngOnInit() {
  }

}
