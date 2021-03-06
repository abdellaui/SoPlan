import { Component, OnInit } from '@angular/core';
import { RoomSchema } from '@entity/_room/room.entity';
import { Bedroom, BedroomSchema } from '@entity/bedroom/bedroom.entity';
import { Event, EventSchema } from '@entity/event/event.entity';
import { Group, GroupSchema } from '@entity/group/group.entity';
import { Participant, ParticipantSchema } from '@entity/participant/participant.entity';
import { Person, PersonSchema } from '@entity/person/person.entity';
import { SmartTableConfig } from '@models/componentInput.class';
import { I18n } from '@models/translation/i18n.class';
import { HistoryMemoryService } from '@services/history-memory/history-memory.service';

enum PersonView { TABLE, PROCESS }
@Component({
  selector: 'app-participant-liste',
  templateUrl: './participant-liste.component.html',
  styleUrls: ['./participant-liste.component.scss']
})
export class ParticipantListeComponent implements OnInit {
  public _i18n = I18n; // for accessing in html
  public selectedPerson: any[] = [];
  public currentView: PersonView;

  public st_config: SmartTableConfig = {
    settings: {
      header: I18n.resolve('participants'),
      showCreateButton: true,
      createButtonText: I18n.resolve('participant_new_participant')
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
        prefix: '',
        schema: ParticipantSchema,
        members: ['role', 'grade']
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
    ],
    customActions: [
      {
        name: 'process_user',
        icon: 'nb-email',
        tooltip: I18n.resolve('person_process')
      }
    ]
  };

  constructor(private history: HistoryMemoryService) { }

  ngOnInit() {
  }

  showUserProcess(): boolean {
    return (this.selectedPerson.length > 0 && this.currentView === PersonView.PROCESS);
  }
  processUser(data: Participant[]): void {
    this.history.enabledBack = false;
    this.currentView = PersonView.PROCESS;
    this.selectedPerson = data.map((part: Participant) => {
      return Object.assign(part, { mail: part.person.communication.mail });
    });
  }

  backToTableView(): void {
    this.currentView = PersonView.TABLE;
    this.selectedPerson = [];
    this.history.enabledBack = true;
  }

  onCustomAction(event: any): void {

    if (event.action === 'process_user') {
      this.processUser(event.data);
    }
  }
}
