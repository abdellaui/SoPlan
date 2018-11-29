import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bedroom } from '@entity/bedroom/bedroom.entity';
import { Participant, ParticipantSchema } from '@entity/participant/participant.entity';
import { EntitySelectSettings, FormBuilderSettings } from '@models/componentInput.class';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-participant-editor',
  templateUrl: './participant-editor.component.html',
  styleUrls: ['./participant-editor.component.scss']
})
export class ParticipantEditorComponent implements OnInit {

  public readyToSave = false;
  public rememberReadyStatus = {
    participant: false
  };

  public form_participantInstance: Participant;
  public form_groupSchema = ParticipantSchema;
  public form_groupSettings: FormBuilderSettings = <FormBuilderSettings>{
    header: 'Teilnehmer',
    buttons: false,
  };

  public event_selectedIds: number[] = [];
  public selection_event_settings: EntitySelectSettings = <EntitySelectSettings>{
    getUrl: 'get/event/all',
    listNameMembers: ['name'],
    listTitleMembers: ['id', { hosting: [{ location: ['postalcode', 'city'] }] }],
    header: 'Veranstalltung',
    maxSelection: 1,
    showCreateButton: true,
    editorUrl: '/logged/event/editor/',
  };

  public classroom_selectedIds: number[] = [];
  public selection_classroom_settings: EntitySelectSettings = <EntitySelectSettings>{
    getUrl: 'get/event/classrooms',
    listNameMembers: ['identifier'],
    listTitleMembers: [{ room: ['floor', 'corridor', 'number', 'name'] }],
    header: 'Klassenräume',
    maxSelection: 1,
    showCreateButton: false,
    getParams: { id: 0 }
  };

  public isLoaded = false;


  constructor(
    private route: ActivatedRoute,
    private ipc: IpcRendererService,
    private toastr: ToastrService,
    private router: Router) {
  }

  regenarate(): void {
    this.form_participantInstance = Object.assign(new Participant(),
      { event: { id: null }, bedroom: { id: null }, person: { id: null }, comments: [] }); // fallback
    this.isLoaded = false;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.regenarate();
      this.event_selectedIds = (params['eventId']) ? [Number(params['eventId'])] : [];

      if (params && params['id'] && params['id'] > 0) {
        this.ipc.get('get/group/by/id', { id: params['id'] }).then((result: any) => {

          if (result !== 0) {
            this.reassignGroup(result);
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
  reassignGroup(bedroom: Bedroom): void {
    this.form_participantInstance = Object.assign(this.form_participantInstance, bedroom);
    this.event_selectedIds = [this.form_participantInstance.event.id];
    this.classroom_selectedIds = [this.form_participantInstance.classroom.id];
  }

  updateReadyToSave(): void {
    // alle Werte readyStatusse auf ihre Negation filtern und falls Ergebnis Array länge 0 hat => true
    this.readyToSave = (Object.values(this.rememberReadyStatus).filter(x => !x).length === 0
      && this.form_participantInstance.event.id > 0
      && this.form_participantInstance.classroom.id > 0);
  }

  checkFinished(event: any, member: string) {
    // error gibt an obs error hat
    this.rememberReadyStatus[member] = event;
    this.updateReadyToSave();
  }

  eventSelected(event: number[]): void {
    const newEventId = (event && event.length) ? event[0] : null;

    // falls sich event ändert soll klassenzimmer resettet werden
    if (this.form_participantInstance.event.id && this.form_participantInstance.event.id !== newEventId) {
      this.form_participantInstance.person.id = null;
    }
    this.form_participantInstance.event.id = newEventId;
    this.selection_classroom_settings.getParams = { id: this.form_participantInstance.event.id };
    this.updateReadyToSave();
  }

  personSelected(event: number[]): void {
    this.form_participantInstance.person.id = (event && event.length) ? event[0] : null;
    this.updateReadyToSave();
  }

  save(): void {
    if (!this.readyToSave) {
      return;
    }


    this.ipc.get('post/group', this.form_participantInstance).then((result: any) => {
      if (result !== 0) {
        this.toastr.info('Group gespeichert wurde erfolgreich gespeichert!');
        this.router.navigateByUrl('/logged/group/editor/0/' + result.id);
      } else {
        this.toastr.error(`Fehler!`);
      }
    });

  }

}
