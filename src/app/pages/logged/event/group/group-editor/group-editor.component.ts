import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Classroom } from '@entity/classroom/classroom.entity';
import { Event } from '@entity/event/event.entity';
import { Group, GroupSchema } from '@entity/group/group.entity';
import { EntitySelectSettings, FormBuilderSettings } from '@models/componentInput.class';
import { ErrorRequest } from '@models/errorRequest.class';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-group-editor',
  templateUrl: './group-editor.component.html',
  styleUrls: ['./group-editor.component.scss']
})
export class GroupEditorComponent implements OnInit {

  public readyToSave = false;
  public rememberReadyStatus = {
    group: false
  };

  public form_group: Group;
  public form_groupSchema = GroupSchema;
  public form_groupSettings: FormBuilderSettings = <FormBuilderSettings>{
    header: 'Gruppe',
    buttons: false,
  };

  public event_selectedIds: number[] = [];
  public selection_event_settings: EntitySelectSettings = <EntitySelectSettings>{
    getUrl: 'get/event/all',
    listNameMembers: ['name'],
    listTitleMembers: ['id', { hosting: [{ location: ['postalcode', 'city'] }] }],
    header: 'Veranstaltung',
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
    this.form_group = Object.assign(new Group(), { event: { id: null }, classroom: { id: null }, comments: [] }); // fallback
    this.classroom_selectedIds = [];
    this.event_selectedIds = [];
    this.isLoaded = false;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.regenarate();
      this.event_selectedIds = (params['eventId']) ? [Number(params['eventId'])] : [];
      if (params && params['id'] && params['id'] > 0) {
        this.ipc.get('get/group/by/id', { id: params['id'] }).then((result: any) => {
          if (!ErrorRequest.hasError(result)) { // result.error has the error
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
  reassignGroup(group: Group): void {
    this.form_group = Object.assign(this.form_group, group);
    this.reorganizeInstance();
  }

  reorganizeInstance(): void {
    this.form_group.event = this.form_group.event || <Event>{ id: null };
    this.form_group.classroom = this.form_group.classroom || <Classroom>{ id: null };

    this.event_selectedIds = [this.form_group.event.id];
    this.classroom_selectedIds = [this.form_group.classroom.id];
    this.selection_classroom_settings.getParams = { id: this.form_group.event.id };
  }

  updateReadyToSave(): void {
    // alle Werte readyStatusse auf ihre Negation filtern und falls Ergebnis Array länge 0 hat => true
    this.readyToSave = (Object.values(this.rememberReadyStatus).filter(x => !x).length === 0
      && this.form_group.event.id > 0
      && this.form_group.classroom.id > 0);
  }

  checkFinished(event: any, member: string) {
    // error gibt an obs error hat
    this.rememberReadyStatus[member] = event;
    this.updateReadyToSave();
  }

  eventSelected(event: number[]): void {
    const newEventId = (event && event.length) ? event[0] : null;

    // falls sich event ändert soll klassenzimmer resettet werden
    if (this.form_group.event.id && this.form_group.event.id !== newEventId) {
      this.classroomSelected([]);
    }
    this.form_group.event.id = newEventId;
    this.reorganizeInstance();
    this.updateReadyToSave();
  }
  classroomSelected(event: number[]): void {
    this.form_group.classroom.id = (event && event.length) ? event[0] : null;
    this.updateReadyToSave();
  }

  save(): void {
    if (!this.readyToSave) {
      return;
    }

    this.ipc.get('post/group', this.form_group).then((result: any) => {
      if (!ErrorRequest.hasError(result)) { // result.error has the error
        this.toastr.info('Group gespeichert wurde erfolgreich gespeichert!');
        this.router.navigateByUrl('/logged/event/group/editor/0/' + result.id);
      } else {
        this.toastr.error(`Fehler! ${result.error}`);
      }
    });

  }
}
