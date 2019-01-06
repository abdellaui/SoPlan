import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bedroom } from '@entity/bedroom/bedroom.entity';
import { Group } from '@entity/group/group.entity';
import { Participant, ParticipantSchema } from '@entity/participant/participant.entity';
import { EntitySelectSettings, FormBuilderSettings } from '@models/componentInput.class';
import { ErrorRequest } from '@models/errorRequest.class';
import { I18n } from '@models/translation/i18n.class';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-participant-editor',
  templateUrl: './participant-editor.component.html',
  styleUrls: ['./participant-editor.component.scss']
})
export class ParticipantEditorComponent implements OnInit {

  public _i18n = I18n;
  public readyToSave = false;
  public rememberReadyStatus = {
    participant: false
  };

  public form_participant: Participant;
  public form_groupSchema = ParticipantSchema;
  public form_groupSettings: FormBuilderSettings = <FormBuilderSettings>{
    header: I18n.resolve('participant'),
    buttons: false,
  };

  // EVENT SELECTION
  public event_selectedIds: number[] = [];
  public selection_event_settings: EntitySelectSettings = <EntitySelectSettings>{
    getUrl: 'get/event/all',
    listNameMembers: ['name'],
    listTitleMembers: ['id', { hosting: [{ location: ['postalcode', 'city'] }] }],
    header: I18n.resolve('event'),
    maxSelection: 1,
    showCreateButton: true,
    editorUrl: '/logged/event/editor/',
  };

  // PERSON SELECTION
  public person_selectedIds: number[] = [];
  public selection_person_settings: EntitySelectSettings = <EntitySelectSettings>{
    getUrl: 'get/person/all',
    listNameMembers: ['firstname', 'surname'],
    listTitleMembers: ['gender', { location: ['postalcode', 'city'] }],
    header: I18n.resolve('person'),
    maxSelection: 1,
    showCreateButton: true,
    editorUrl: '/logged/person/editor/',
  };

  // GROUP SELECTION
  public group_selectedIds: number[] = [];
  public selection_group_settings: EntitySelectSettings = <EntitySelectSettings>{
    getUrl: 'get/event/groups',
    listNameMembers: ['name'],
    listTitleMembers: [{ classroom: [{ room: ['floor', 'corridor', 'number', 'name'] }] }],
    header: I18n.resolve('groups'),
    maxSelection: 1,
    showCreateButton: false,
    getParams: { id: 0 }
  };

  // BEDROOM SELECTION
  public bedroom_selectedIds: number[] = [];
  public selection_bedroom_settings: EntitySelectSettings = <EntitySelectSettings>{
    getUrl: 'get/event/bedrooms',
    listNameMembers: ['type'],
    listTitleMembers: [{ room: ['floor', 'corridor', 'number', 'name'] }],
    header: 'Schlafräume',
    maxSelection: 1,
    showCreateButton: false,
    getParams: { id: 0 }
  };

  // PARTICIPANT SELECTION
  public participant_selectedIds: number[] = [];
  public selection_participant_settings: EntitySelectSettings = <EntitySelectSettings>{
    getUrl: 'get/event/participants',
    listNameMembers: [{ person: ['firstname', 'surname'] }],
    listTitleMembers: ['grade', 'role', { person: ['gender'] }],
    header: 'Zimmerwunsch',
    maxSelection: 3,
    showCreateButton: false,
    getParams: { id: 0, except: 0 }
  };


  public isLoaded = false;


  constructor(
    private route: ActivatedRoute,
    private ipc: IpcRendererService,
    private toastr: ToastrService,
    private router: Router) {
  }

  regenarate(): void {
    this.form_participant = Object.assign(new Participant(),
      { event: { id: null }, bedroom: { id: null }, person: { id: null }, group: { id: null }, comments: [] }); // fallback

    this.event_selectedIds = [];
    this.person_selectedIds = [];
    this.bedroom_selectedIds = [];
    this.group_selectedIds = [];
    this.participant_selectedIds = [];

    this.isLoaded = false;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.regenarate();
      this.event_selectedIds = (params['eventId']) ? [Number(params['eventId'])] : [];
      if (params && params['id'] && params['id'] > 0) {
        this.ipc.get('get/participant/by/id', { id: params['id'] }).then((result: any) => {

          if (!ErrorRequest.hasError(result)) { // result.error has the error
            this.reassignParticipant(result);
          }
          this.isLoaded = true;
        });
      } else {
        this.isLoaded = true;
      }
    });
  }
  /**
   * result enthält nur prototype + attributswerte
   * daher werden neue Instanze erzeugt line 44-46
   * diese enthalten Methoden der Klasse etc. und alle Dekoratoren können ausgeführt werden
   * über Object.assign wird die rohe Struktur + daten in die neue Instanz geschoben.
   */
  reassignParticipant(participant: Participant): void {
    this.form_participant = Object.assign(this.form_participant, participant);
    this.reorganizeInstance();
  }

  reorganizeInstance(): void {

    this.form_participant.group = this.form_participant.group || <Group>{ id: null };
    this.form_participant.bedroom = this.form_participant.bedroom || <Bedroom>{ id: null };

    this.event_selectedIds = [this.form_participant.event.id];
    this.person_selectedIds = [this.form_participant.person.id];
    this.group_selectedIds = this.form_participant.group ? [this.form_participant.group.id] : [];
    this.bedroom_selectedIds = this.form_participant.bedroom ? [this.form_participant.bedroom.id] : [];
    this.participant_selectedIds = this.form_participant.ids_wantsToBeWith || [];

    this.selection_group_settings.getParams = { id: this.form_participant.event.id };
    this.selection_bedroom_settings.getParams = { id: this.form_participant.event.id };
    this.selection_participant_settings.getParams = { id: this.form_participant.event.id, except: this.form_participant.id };
  }

  updateReadyToSave(): void {
    // alle Werte readyStatusse auf ihre Negation filtern und falls Ergebnis Array länge 0 hat => true
    this.readyToSave = (Object.values(this.rememberReadyStatus).filter(x => !x).length === 0
      && this.form_participant.event.id > 0
      && this.form_participant.person.id > 0
      /*&& this.form_participant.group.id > 0
      && this.form_participant.bedroom.id > 0*/
    );
  }

  checkFinished(event: any, member: string) {
    // error gibt an obs error hat
    this.rememberReadyStatus[member] = event;
    this.updateReadyToSave();
  }

  eventSelected(event: number[]): void {
    const newEventId = (event && event.length) ? event[0] : null;

    // falls sich event ändert soll schlafzimmer, gruppe resettet werden
    if (this.form_participant.event.id && this.form_participant.event.id !== newEventId) {
      this.groupSelected([]);
      this.bedroomSelected([]);
      this.participantSelected([]);
    }
    this.form_participant.event.id = newEventId;
    this.reorganizeInstance();
    this.updateReadyToSave();
  }

  personSelected(event: number[]): void {
    this.form_participant.person.id = (event && event.length) ? event[0] : null;
    this.updateReadyToSave();
  }

  groupSelected(event: number[]): void {
    this.form_participant.group.id = (event && event.length) ? event[0] : null;
    this.updateReadyToSave();
  }
  bedroomSelected(event: number[]): void {
    this.form_participant.bedroom.id = (event && event.length) ? event[0] : null;
    this.updateReadyToSave();
  }

  participantSelected(event: number[]): void {
    this.form_participant.ids_wantsToBeWith = (event && event.length) ? event : [];
    this.form_participant.wantsToBeWith = this.form_participant.ids_wantsToBeWith.map(el => <Participant>{ id: el });
    this.updateReadyToSave();
  }
  save(): void {
    if (!this.readyToSave) {
      return;
    }

    this.ipc.get('post/participant', this.form_participant).then((result: any) => {
      if (!ErrorRequest.hasError(result)) { // result.error has the error
        this.toastr.info(I18n.resolve('toastr_participant_saved'));
        this.router.navigateByUrl('/logged/event/participant/editor/0/' + result.id);
      } else {
        this.toastr.error(`${I18n.resolve('something_went_wrong')} ${JSON.stringify(result.error)}`);
      }
    });

  }

}
