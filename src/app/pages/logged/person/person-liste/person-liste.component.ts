import { Component, OnInit } from '@angular/core';
import { Communication, CommunicationSchema } from '@entity/_communication/communicaton.entity';
import { Location, LocationSchema } from '@entity/_location/location.entity';
import { Participant, ParticipantSchema } from '@entity/participant/participant.entity';
import { Person, PersonSchema } from '@entity/person/person.entity';
import { SmartTableConfig } from '@models/componentInput.class';
import { ErrorRequest } from '@models/errorRequest.class';
import { I18n } from '@models/translation/i18n.class';
import { CurrentEventService } from '@services/current-event/current-event.service';
import { HistoryMemoryService } from '@services/history-memory/history-memory.service';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { ToastrService } from 'ngx-toastr';

enum PersonView { TABLE, PARTICIPANT, PROCESS }

@Component({
  selector: 'app-person-liste',
  templateUrl: './person-liste.component.html',
  styleUrls: ['./person-liste.component.scss']
})

export class PersonListeComponent implements OnInit {

  public _i18n = I18n;
  public st_config: SmartTableConfig = {
    settings: {
      header: I18n.resolve('person_list'),
      showCreateButton: true,
      createButtonText: I18n.resolve('person_new_person')
    },
    slotUrls: {
      getUrl: 'get/person/all',
      postUrl: 'post/person',
      deleteUrl: 'delete/person',
      editorUrl: '/logged/person/editor/'
    },
    instanceMap: {
      '': Person.prototype,
      'location': Location.prototype,
      'communication': Communication.prototype,
    },
    memberList: [
      {
        prefix: '',
        schema: PersonSchema,
        members: [
          'firstname',
          'surname',
          'gender',
          'birthDate'
        ],
        extendedSettings: {
          gender: {
            width: '10px'
          }
        }
      },
      {
        prefix: 'location@',
        schema: LocationSchema,
        members: ['city']
      },
      {
        prefix: 'communication@',
        schema: CommunicationSchema,
        members: ['mail']
      },
    ],
    customActions: [
      {
        name: 'add_participant',
        icon: 'nb-person',
        tooltip: I18n.resolve('particpant_new_participants')
      },
      {
        name: 'process_user',
        icon: 'nb-email',
        tooltip: I18n.resolve('person_process')
      }
    ]
  };



  public form_participantSchema = ParticipantSchema;
  public selectedPerson: any[] = [];
  public currentView: PersonView;
  public rememberReadyStatus = {};
  public readyToSave = false;

  constructor(private currentEventService: CurrentEventService, private ipc: IpcRendererService, private toastr: ToastrService,
    private history: HistoryMemoryService) {

    ipc.on('post/participant', (event: any, result: any) => {
      if (ErrorRequest.hasError(result)) {
        this.toastr.warning(I18n.resolve('toastr_person_could_not_be_added') + JSON.stringify(result.error));
      }
    });
  }

  ngOnInit() {}

  /**
   * Erstellt ein Lookup Table für jedes Formular um im Nachhinein überprüfen zu können, ob alle Formulare Validierung passieren konnten
   * @param event boolean: sagt aus ob ein formular validierung passieren konnnte
   * @param member identiefiziert formular
   */
  checkFinished(event: any, member: string) {
    // event gibt an obs error hat
    this.rememberReadyStatus[member] = event;

    this.updateReadyToSave();
  }

  /**
   * Updated bool, welches angibt das jedes Formular valide ist => button anzeigen und trigger akzeptieren
   */
  updateReadyToSave(): void {
    // alle Werte readyStatusse auf ihre Negation filtern und falls Ergebnis Array länge 0 hat => true
    this.readyToSave = (Object.values(this.rememberReadyStatus).filter(x => !x).length === 0);
  }

  /**
   * für jeden Eintrag in selectedPerson (type: Participant) wird Slot zum Einfügen aufgerufen
   */
  addParticipants(): void {
    if (!this.readyToSave) {
      return;
    }

    this.selectedPerson.forEach((parti: Participant) => {
      this.ipc.send('post/participant', parti);
    });
    this.toastr.success(I18n.resolve('toastr_go_back'));
    this.backToTableView();
  }

  /**
   * löscht lookup table für validation und zwischenspeicher von selection => keine selection => table anzeigen
   */
  backToTableView(): void {
    this.currentView = PersonView.TABLE;
    this.selectedPerson = [];
    this.rememberReadyStatus = {};
    this.history.enabledBack = true;
  }

  /**
   * falls zwischenspeicher einträge hat => wächsle zur andere view
   */
  showParticipantAddingView(): boolean {
    return (this.selectedPerson.length > 0 && this.currentView === PersonView.PARTICIPANT);
  }


  /**
   * falls zwischenspeicher einträge hat => wächsle zur andere view
   */
  showUserProcess(): boolean {
    return (this.selectedPerson.length > 0 && this.currentView === PersonView.PROCESS);
  }

  /**
   * Personen werden zur Teilnehmer
   * @param data  array von Person
   */
  personToParticipant(data: Person[]): void {
    this.currentView = PersonView.PARTICIPANT;
    this.selectedPerson = data.map((person: Person) => {
      const parti = new Participant();
      parti.person = person;
      parti.event = this.currentEventService.getEvent();
      return parti;
    });
  }


  processUser(data: Person[]): void {
    this.currentView = PersonView.PROCESS;
    this.selectedPerson = data.map((person: Person) => {
      return Object.assign(person, { mail: person.communication.mail });
    });
  }

  /**
   * listet ob custom actions von smart table getriggert wurden
   * @param event  {action:string , data: any[]} => action gibt custom action name an
   * siehe this.st_config.customAction, data enthält selection
   */
  onCustomAction(event: any): void {
    if (this.currentEventService.getEvent() === null) {
      this.toastr.warning(I18n.resolve('alert_choose_event'));
      return;
    } else if (event.action === 'add_participant') {
      this.history.enabledBack = false;
      this.personToParticipant(event.data);
    }
    if (event.action === 'process_user') {
      this.history.enabledBack = false;
      this.processUser(event.data);
    }
  }

}
