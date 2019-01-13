import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room, RoomSchema } from '@entity/_room/room.entity';
import { Bedroom, BedroomSchema } from '@entity/bedroom/bedroom.entity';
import { Classroom, ClassroomSchema } from '@entity/classroom/classroom.entity';
import { Event, EventSchema } from '@entity/event/event.entity';
import { Group, GroupSchema } from '@entity/group/group.entity';
import { Participant, ParticipantSchema } from '@entity/participant/participant.entity';
import { Person, PersonSchema } from '@entity/person/person.entity';
import { EntitySelectSettings, FormBuilderSettings, SmartTableConfig } from '@models/componentInput.class';
import { ErrorRequest } from '@models/errorRequest.class';
import { I18n } from '@models/translation/i18n.class';
import { CurrentEventService } from '@services/current-event/current-event.service';
import { HistoryMemoryService } from '@services/history-memory/history-memory.service';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { ToastrService } from 'ngx-toastr';

enum PersonView { TABLE, PROCESS }
@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss']
})
export class EventEditorComponent implements OnInit {
  public _i18n = I18n;
  public readyToSave = false;
  public rememberReadyStatus = {
    event: false
  };

  public isLoaded = false;


  public form_event: Event;
  public form_eventSchema = EventSchema;
  public form_eventSettings: FormBuilderSettings = <FormBuilderSettings>{
    header: I18n.resolve('event'),
    buttons: false
  };

  public selection_selectedIds: number[] = [];
  public selection_setttins: EntitySelectSettings = <EntitySelectSettings>{
    getUrl: 'get/venue/all',
    listNameMembers: ['name'],
    listTitleMembers: ['id', { location: ['postalcode', 'city'] }],
    header: I18n.resolve('event_location'),
    maxSelection: 1,
    showCreateButton: true,
    editorUrl: '/logged/venue/editor/',
  };



  public st_group_config: SmartTableConfig = {
    settings: {
      header: 'Gruppen',
      showCreateButton: true,
      createButtonText: I18n.resolve('group_new_group')
    },
    slotUrls: {
      getUrl: 'get/event/groups',
      postUrl: 'post/group',
      deleteUrl: 'delete/group',
      editorUrl: '/logged/event/group/editor/0/',
      getParam: { id: 0 }
    },
    instanceMap: {
      '': Group.prototype,
      'event': Event.prototype,
      'classroom': Classroom.prototype,
      'room': Room.prototype,
    },
    memberList: [
      {
        prefix: '',
        schema: GroupSchema,
        members: ['name', 'capacity']
      },
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
        prefix: 'classroom@',
        schema: ClassroomSchema,
        members: ['identifier'],
        extendedSettings: {
          identifier: {
            editable: false
          }
        }
      }, {
        prefix: 'classroom@room@',
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

  public st_participant_config: SmartTableConfig = {
    settings: {
      header: I18n.resolve('participants'),
      showCreateButton: true,
      createButtonText: I18n.resolve('participant_new_participant')
    },
    slotUrls: {
      getUrl: 'get/event/participants',
      postUrl: 'post/participant',
      deleteUrl: 'delete/participant',
      editorUrl: '/logged/event/participant/editor/0/',
      getParam: { id: 10 }
    },
    instanceMap: {
      '': Participant.prototype,
      'person': Person.prototype,
      'group': Group.prototype,
      'bedroom': Bedroom.prototype
    },
    memberList: [
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
  public selectedPerson: any[] = [];
  public currentView: PersonView;


  constructor(
    private route: ActivatedRoute,
    private ipc: IpcRendererService,
    private toastr: ToastrService,
    private currentEventService: CurrentEventService,
    private router: Router,
    private history: HistoryMemoryService
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.regenarate();
      if (params && params['id'] && params['id'] > 0) {
        this.ipc.get('get/event/by/id', { id: params['id'] }).then((result: any) => {

          if (!ErrorRequest.hasError(result)) { // result.error has the error
            this.reassignEvent(result);
          }
          this.isLoaded = true;
        });
      } else {
        this.isLoaded = true;
      }
    });
  }

  regenarate(): void {
    this.form_event = Object.assign(new Event(), { hosting: { id: null }, comments: [] }); // fallbacks
    this.isLoaded = false;
  }

  reassignEvent(event: Event): void {
    this.form_event = Object.assign(this.form_event, event);
    this.selection_selectedIds = this.form_event.hosting ? [this.form_event.hosting.id] : [];

    const appendingId = (this.form_event.id) ? this.form_event.id : 0;

    this.st_group_config.slotUrls.getParam = { id: appendingId };
    this.st_group_config.slotUrls.editorUrl = `/logged/event/group/editor/${appendingId}/`;

    this.st_participant_config.slotUrls.getParam = { id: appendingId };
    this.st_participant_config.slotUrls.editorUrl = `/logged/event/participant/editor/${appendingId}/`;

  }

  checkFinished(event: any, member: string) {
    // error gibt an obs error hat
    this.rememberReadyStatus[member] = event;

    // alle Werte readyStatusse auf ihre Negation filtern und falls Ergebnis Array länge 0 hat => true
    this.updateReadyToSave();
  }

  updateReadyToSave(): void {
    // alle Werte readyStatusse auf ihre Negation filtern und falls Ergebnis Array länge 0 hat => true
    this.readyToSave = (Object.values(this.rememberReadyStatus).filter(x => !x).length === 0 && this.form_event.hosting.id > 0);
  }
  selectionSelected(event: number[]): void {
    this.form_event.hosting.id = (event && event.length) ? event[0] : null;
    this.updateReadyToSave();
  }
  save(): void {
    if (!this.readyToSave) {
      return;
    }


    this.ipc.get('post/event', this.form_event).then((result: any) => {
      if (!ErrorRequest.hasError(result)) { // result.error has the error
        this.toastr.info(I18n.resolve('toastr_event_susscess_save'));
        this.currentEventService.refreshEvents();
        this.router.navigateByUrl('/logged/event/editor/' + result.id);
      } else {
        this.toastr.error(`${I18n.resolve('something_went_wrong')} ${JSON.stringify(result.error)}`);
      }
    });

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
