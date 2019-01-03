import { Component, OnInit } from '@angular/core';
import { Communication, CommunicationSchema } from '@entity/_communication/communicaton.entity';
import { Location, LocationSchema } from '@entity/_location/location.entity';
import { Participant, ParticipantSchema } from '@entity/participant/participant.entity';
import { Person, PersonSchema } from '@entity/person/person.entity';
import { SmartTableConfig } from '@models/componentInput.class';
import { ErrorRequest } from '@models/errorRequest.class';
import { CurrentEventService } from '@services/current-event/current-event.service';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { ToastrService } from 'ngx-toastr';

enum PersonView { TABLE, PARTICIPANT, PROCESS }

@Component({
  selector: 'app-person-liste',
  templateUrl: './person-liste.component.html',
  styleUrls: ['./person-liste.component.scss']
})

export class PersonListeComponent implements OnInit {

  public st_config: SmartTableConfig = {
    settings: {
      header: 'Personenliste',
      showCreateButton: true,
      createButtonText: 'Neue Person'
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
        tooltip: 'Teilnehmer erstellen'
      },
      {
        name: 'process_user',
        icon: 'nb-email',
        tooltip: 'Person process'
      }
    ]
  };



  public form_participantSchema = ParticipantSchema;
  public selectedPerson: any[] = [];
  public currentView: PersonView;
  public rememberReadyStatus = {};
  public readyToSave = false;

  constructor(private currentEventService: CurrentEventService, private ipc: IpcRendererService, private toastr: ToastrService) {

    ipc.on('post/participant', (event: any, result: any) => {
      if (ErrorRequest.hasError(result)) {
        this.toastr.warning('Eine Person konnte nicht hinzugefügt werden!');
        console.log(result.error, result.input);
      }
    });
  }

  ngOnInit() {
  }


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
    this.toastr.success('Okey go back bitch!');
    this.backToTableView();
  }

  /**
   * löscht lookup table für validation und zwischenspeicher von selection => keine selection => table anzeigen
   */
  backToTableView(): void {
    this.currentView = PersonView.TABLE;
    this.selectedPerson = [];
    this.rememberReadyStatus = {};
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
      return window.alert('Halt stopp! Erst einmal Veranst. wählen!');
    } else if (event.action === 'add_participant') {
      this.personToParticipant(event.data);
    }
    if (event.action === 'process_user') {
      this.processUser(event.data);
    }
  }

}
