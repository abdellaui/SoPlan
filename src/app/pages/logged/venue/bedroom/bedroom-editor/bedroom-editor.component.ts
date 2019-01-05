import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room, RoomSchema } from '@entity/_room/room.entity';
import { Bedroom, BedroomSchema } from '@entity/bedroom/bedroom.entity';
import { EntitySelectSettings, FormBuilderSettings } from '@models/componentInput.class';
import { ErrorRequest } from '@models/errorRequest.class';
import { I18n } from '@models/translation/i18n.class';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bedroom-editor',
  templateUrl: './bedroom-editor.component.html',
  styleUrls: ['./bedroom-editor.component.scss']
})
export class BedroomEditorComponent implements OnInit {

  public _i18n = I18n;
  public readyToSave = false;
  public rememberReadyStatus = {
    bedroom: false,
    room: false
  };

  public form_bedroom: Bedroom;
  public form_bedroomSchema = BedroomSchema;
  public form_bedroomSettings: FormBuilderSettings = <FormBuilderSettings>{
    header: I18n.resolve('bedroom_type'),
    buttons: false,
    paddings: { left: 'md-12', right: 'md-12' }
  };


  public form_room: Room;
  public form_roomSchema = RoomSchema;
  public form_roomSettings: FormBuilderSettings = <FormBuilderSettings>{
    header: I18n.resolve('bedroom_room'),
    buttons: false
  };

  public selection_selectedIds: number[] = [];
  public selection_setttins: EntitySelectSettings = <EntitySelectSettings>{
    getUrl: 'get/venue/all',
    listNameMembers: ['name'],
    listTitleMembers: ['id', { location: ['postalcode', 'city'] }],
    header: I18n.resolve('bedroom_location'),
    maxSelection: 1,
    showCreateButton: true,
    editorUrl: '/logged/venue/editor/',
  };

  public isLoaded = false;


  constructor(
    private route: ActivatedRoute,
    private ipc: IpcRendererService,
    private toastr: ToastrService,
    private router: Router) {
  }

  regenarate(): void {
    this.form_bedroom = Object.assign(new Bedroom(), { venue: { id: null }, comments: [] }); // fallback
    this.form_room = new Room();
    this.isLoaded = false;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.regenarate();
      this.selection_selectedIds = (params['venueId']) ? [Number(params['venueId'])] : [];

      if (params && params['id'] && params['id'] > 0) {
        this.ipc.get('get/bedroom/by/id', { id: params['id'] }).then((result: any) => {

          if (!ErrorRequest.hasError(result)) { // result.error has the error
            this.reassignBedroom(result);
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
  reassignBedroom(bedroom: Bedroom): void {
    this.form_bedroom = Object.assign(this.form_bedroom, bedroom);
    this.form_room = Object.assign(this.form_room, bedroom.room);
    this.selection_selectedIds = [this.form_bedroom.venue.id];
  }

  updateReadyToSave(): void {
    // alle Werte readyStatusse auf ihre Negation filtern und falls Ergebnis Array länge 0 hat => true
    this.readyToSave = (Object.values(this.rememberReadyStatus).filter(x => !x).length === 0 && this.form_bedroom.venue.id > 0);
  }

  checkFinished(event: any, member: string) {
    // error gibt an obs error hat
    this.rememberReadyStatus[member] = event;
    this.updateReadyToSave();
  }


  selectionSelected(event: number[]): void {
    this.form_bedroom.venue.id = (event && event.length) ? event[0] : null;
    this.updateReadyToSave();
  }

  save(): void {
    if (!this.readyToSave) {
      return;
    }

    this.form_bedroom.room = this.form_room;


    this.ipc.get('post/bedroom', this.form_bedroom).then((result: any) => {
      if (!ErrorRequest.hasError(result)) { // result.error has the error
        this.toastr.info(I18n.resolve('toastr_bedroom_save_success'));
        this.router.navigateByUrl('/logged/venue/bedroom/editor/0/' + result.id);
      } else {
        this.toastr.error(`${I18n.resolve('something_went_wrong')} ${JSON.stringify(result.error)}`);
      }
    });

  }


}
