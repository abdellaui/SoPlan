import { Component, OnInit } from '@angular/core';
import { RoomSchema } from '@entity/_room/room.entity';
import { Bedroom, BedroomSchema } from '@entity/bedroom/bedroom.entity';
import { Event, EventSchema } from '@entity/event/event.entity';
import { Group, GroupSchema } from '@entity/group/group.entity';
import { Participant, ParticipantSchema } from '@entity/participant/participant.entity';
import { Person, PersonSchema } from '@entity/person/person.entity';
import { SmartTableConfig } from '@models/componentInput.class';

@Component({
  selector: 'app-participant-liste',
  templateUrl: './participant-liste.component.html',
  styleUrls: ['./participant-liste.component.scss']
})
export class ParticipantListeComponent implements OnInit {
  public st_config: SmartTableConfig = {
    settings: {
      header: 'Participant',
      showCreateButton: true,
      createButtonText: 'Teilnehmer hinzufügen'
    },
    slotUrls: {
      getUrl: 'get/participant/all',
      postUrl: 'post/participant',
      deleteUrl: 'delete/participant',
      editorUrl: '/logged/event/participant/editor/0/'
    },
    instanceMap: {
      '': Participant.prototype,
      'person': Person.prototype,
      'group': Group.prototype,
      'bedroom': Bedroom.prototype,
      'event': Event.prototype
    },
    memberList: [
      {
        prefix: 'event@',
        schema: EventSchema,
        members: ['name'],
        extendedSettings: {
          name: {
            editable: false
          }
        }
      },
      {
        prefix: '',
        schema: ParticipantSchema,
        members: ['role', 'grade']
      },
      {
        prefix: 'person@',
        schema: PersonSchema,
        members: ['firstname', 'surname'],
        extendedSettings: {
          firstname: {
            editable: false
          },
          surname: {
            editable: false
          }
        }
      },
      {
        prefix: 'group@',
        schema: GroupSchema,
        members: ['name'],
        extendedSettings: {
          name: {
            editable: false
          }
        }
      },
      {
        prefix: 'bedroom@',
        schema: BedroomSchema,
        members: ['type'],
        extendedSettings: {
          type: {
            editable: false
          }
        }
      }, {
        prefix: 'bedroom@room@',
        schema: RoomSchema,
        members: ['floor', 'corridor', 'number', 'name'],
        extendedSettings: {
          floor: {
            editable: false
          },
          corridor: {
            editable: false
          },
          number: {
            editable: false
          },
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
