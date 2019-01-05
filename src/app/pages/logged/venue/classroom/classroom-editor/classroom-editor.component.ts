import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room, RoomSchema } from '@entity/_room/room.entity';
import { Classroom, ClassroomSchema } from '@entity/classroom/classroom.entity';
import { EntitySelectSettings, FormBuilderSettings } from '@models/componentInput.class';
import { ErrorRequest } from '@models/errorRequest.class';
import { I18n } from '@models/translation/i18n.class';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-classroom-editor',
  templateUrl: './classroom-editor.component.html',
  styleUrls: ['./classroom-editor.component.scss']
})
export class ClassroomEditorComponent implements OnInit {

  public _i18n = I18n;
  public readyToSave = false;
  public isLoaded = false;
  public rememberReadyStatus = {
    classroom: false,
    room: false
  };

  public form_classroom: Classroom;
  public form_classroomSchema = ClassroomSchema;
  public form_classroomSettings: FormBuilderSettings = <FormBuilderSettings>{
    header: I18n.resolve('classroom'),
    buttons: false,
    paddings: { left: 'md-12', right: 'md-12' }
  };


  public form_room: Room;
  public form_roomSchema = RoomSchema;
  public form_roomSettings: FormBuilderSettings = <FormBuilderSettings>{
    header: I18n.resolve('classroom_room'),
    buttons: false
  };

  public selection_selectedIds: number[] = [];
  public selection_setttins: EntitySelectSettings = <EntitySelectSettings>{
    getUrl: 'get/venue/all',
    listNameMembers: ['name'],
    listTitleMembers: ['id', { location: ['postalcode', 'city'] }],
    header: I18n.resolve('classroom_location'),
    maxSelection: 1,
    showCreateButton: true,
    editorUrl: '/logged/venue/editor/',
  };



  constructor(
    private route: ActivatedRoute,
    private ipc: IpcRendererService,
    private toastr: ToastrService,
    private router: Router) {
  }

  regenarate(): void {
    this.form_classroom = Object.assign(new Classroom(), { venue: { id: null }, comments: [] });
    this.form_room = new Room();
    this.isLoaded = false;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {

      this.regenarate();
      this.selection_selectedIds = (params['venueId']) ? [Number(params['venueId'])] : [];
      if (params && params['id'] && params['id'] > 0) {
        this.ipc.get('get/classroom/by/id', { id: params['id'] }).then((result: any) => {

          if (!ErrorRequest.hasError(result)) { // result.error has the error
            this.reassignClassroom(result);
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
  reassignClassroom(classroom: Classroom): void {
    this.form_classroom = Object.assign(this.form_classroom, classroom);
    this.form_room = Object.assign(this.form_room, classroom.room);
    this.selection_selectedIds = [this.form_classroom.venue.id];
  }

  updateReadyToSave(): void {
    // alle Werte readyStatusse auf ihre Negation filtern und falls Ergebnis Array länge 0 hat => true
    this.readyToSave = (Object.values(this.rememberReadyStatus).filter(x => !x).length === 0 && this.form_classroom.venue.id > 0);
  }

  checkFinished(event: any, member: string) {
    // error gibt an obs error hat
    this.rememberReadyStatus[member] = event;
    this.updateReadyToSave();
  }


  selectionSelected(event: number[]): void {
    this.form_classroom.venue.id = (event && event.length) ? event[0] : null;
    this.updateReadyToSave();
  }

  save(): void {
    if (!this.readyToSave) {
      return;
    }

    this.form_classroom.room = this.form_room;


    this.ipc.get('post/classroom', this.form_classroom).then((result: any) => {
      if (!ErrorRequest.hasError(result)) { // result.error has the error
        this.toastr.info(I18n.resolve('toastr_bedroom_save_success'));
        this.router.navigateByUrl('/logged/venue/classroom/editor/0/' + result.id);
      } else {
        this.toastr.error(`${I18n.resolve('something_went_wrong')} ${JSON.stringify(result.error)}`);
      }
    });

  }

}
