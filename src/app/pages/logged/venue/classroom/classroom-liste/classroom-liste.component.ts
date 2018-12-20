import { Component, OnInit } from '@angular/core';
import { Room, RoomSchema } from '@entity/_room/room.entity';
import { Classroom, ClassroomSchema } from '@entity/classroom/classroom.entity';
import { Venue, VenueSchema } from '@entity/venue/venue.entity';
import { SmartTableConfig } from '@models/componentInput.class';
import { I18n } from '@models/translation/i18n.class';

@Component({
  selector: 'app-classroom-liste',
  templateUrl: './classroom-liste.component.html',
  styleUrls: ['./classroom-liste.component.scss']
})
export class ClassroomListeComponent implements OnInit {
  public st_config: SmartTableConfig = {
    settings: {
      header: I18n.resolve('classroom_list'),
      showCreateButton: true,
      createButtonText: I18n.resolve('classroom_new')
    },
    slotUrls: {
      getUrl: 'get/classroom/all',
      postUrl: 'post/classroom',
      deleteUrl: 'delete/classroom',
      editorUrl: '/logged/venue/classroom/editor/0/'
    },
    instanceMap: {
      '': Classroom.prototype,
      'room': Room.prototype,
      'venue': Venue.prototype
    },
    memberList: [
      {
        prefix: '',
        schema: ClassroomSchema,
        members: ['identifier']
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
