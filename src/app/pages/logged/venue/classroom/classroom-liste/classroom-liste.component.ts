import { Component, OnInit } from '@angular/core';
import { Room, RoomSchema } from '@entity/_room/room.entity';
import { Classroom, ClassroomSchema } from '@entity/classroom/classroom.entity';
import { Venue, VenueSchema } from '@entity/venue/venue.entity';
import { SmartTableConfig } from '@models/componentInput.class';

@Component({
  selector: 'app-classroom-liste',
  templateUrl: './classroom-liste.component.html',
  styleUrls: ['./classroom-liste.component.scss']
})
export class ClassroomListeComponent implements OnInit {
  public st_config: SmartTableConfig = {
    settings: {
      header: 'Classroom liste',
      showCreateButton: true,
      createButtonText: 'Neue Classroom'
    },
    slotUrls: {
      getUrl: 'get/classroom/all',
      postUrl: 'post/classroom',
      deleteUrl: 'delete/classroom',
      editorUrl: '/logged/venue/classroom/editor/0/'
    },
    instanceMap: {
      '': new Classroom(),
      'room': new Room(),
      'venue': new Venue()
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
