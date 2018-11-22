import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Room, RoomSchema } from '@entity/_room/room.entity';
import { Classroom, ClassroomSchema } from '@entity/classroom/classroom.entity';
import { EntitySelectSettings, FormBuilderSettings } from '@models/componentInput.class';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-classroom-editor',
  templateUrl: './classroom-editor.component.html',
  styleUrls: ['./classroom-editor.component.scss']
})
export class ClassroomEditorComponent implements OnInit {

  public readyToSave = false;
  public isLoaded = false;
  public rememberReadyStatus = {
    classroom: false,
    room: false
  };

  public form_classroomInstance: Classroom;
  public form_classroomSchema = ClassroomSchema;
  public form_classroomSettings: FormBuilderSettings = <FormBuilderSettings>{
    header: 'Classroom',
    buttons: false,
    paddings: { left: 'md-12', right: 'md-12' }
  };


  public form_roomInstance: Room;
  public form_roomSchema = RoomSchema;
  public form_roomSettings: FormBuilderSettings = <FormBuilderSettings>{
    header: 'Raum',
    buttons: false
  };

  public selection_selectedIds: number[] = [];
  public selection_setttins: EntitySelectSettings = <EntitySelectSettings>{
    getUrl: 'get/venue/all',
    listNameMembers: ['name'],
    listTitleMembers: ['id', { location: ['postalcode', 'city'] }],
    header: 'Ort',
    maxSelection: 1
  };



  constructor(
    private route: ActivatedRoute,
    private ipc: IpcRendererService,
    private toastr: ToastrService) {
  }

  regenarate(): void {
    this.form_classroomInstance = new Classroom();
    this.form_roomInstance = new Room();
    this.isLoaded = false;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {

      this.regenarate();
      this.selection_selectedIds = (params['venueId']) ? [Number(params['venueId'])] : [];
      if (params && params['id'] && params['id'] > 0) {
        this.ipc.get('get/classroom/by/id', { id: params['id'] }).then((result: any) => {

          if (result !== 0) {
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
    this.form_classroomInstance = Object.assign(this.form_classroomInstance, classroom);
    this.form_roomInstance = Object.assign(this.form_roomInstance, classroom.room);
    this.selection_selectedIds = [this.form_classroomInstance.venueId];
  }

  updateReadyToSave(): void {
    // alle Werte readyStatusse auf ihre Negation filtern und falls Ergebnis Array länge 0 hat => true
    this.readyToSave = (Object.values(this.rememberReadyStatus).filter(x => !x).length === 0 && this.form_classroomInstance.venueId > 0);
  }

  checkFinished(event: any, member: string) {
    // error gibt an obs error hat
    this.rememberReadyStatus[member] = event;
    this.updateReadyToSave();
  }


  selectionSelected(event: number[]): void {
    this.form_classroomInstance.venueId = (event && event.length) ? event[0] : null;
    this.updateReadyToSave();
  }

  save(): void {
    if (!this.readyToSave) {
      return;
    }

    this.form_classroomInstance.room = this.form_roomInstance;


    this.ipc.get('post/classroom', this.form_classroomInstance).then((result: any) => {
      if (result !== 0) {
        this.toastr.info('Schlafraum gespeichert wurde erfolgreich gespeichert!');
        this.reassignClassroom(result);
      } else {
        this.toastr.error(`Fehler!`);
      }
    });

  }

}
