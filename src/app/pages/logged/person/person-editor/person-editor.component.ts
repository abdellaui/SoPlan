import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Communication, CommunicationSchema } from '@entity/_communication/communicaton.entity';
import { Location, LocationSchema } from '@entity/_location/location.entity';
import { Person, PersonSchema } from '@entity/person/person.entity';
import { EntitySelectSettings, FormBuilderSettings } from '@models/componentInput.class';
import { ErrorRequest } from '@models/errorRequest.class';
import { I18n } from '@models/translation/i18n.class';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-person-editor',
  templateUrl: './person-editor.component.html',
  styleUrls: ['./person-editor.component.scss']
})
export class PersonEditorComponent implements OnInit {
  public _i18n = I18n;
  public readyToSave = false;
  public rememberReadyStatus = {
    person: false,
    communication: false,
    location: false
  };

  public form_person: Person;
  public form_personSchema = PersonSchema;
  public form_personSettings: FormBuilderSettings = <FormBuilderSettings>{
    header: I18n.resolve('person_about'),
    buttons: false,
    paddings: { left: 'md-12', right: 'md-12' }
  };


  public form_com: Communication;
  public form_comSchema = CommunicationSchema;
  public form_comSettings: FormBuilderSettings = <FormBuilderSettings>{
    header: I18n.resolve('person_communication'),
    buttons: false
  };

  public form_loc: Location;
  public form_locSchema = LocationSchema;
  public form_locSettings: FormBuilderSettings = <FormBuilderSettings>{
    header: I18n.resolve('person_adress'),
    buttons: false
  };

  public selection_selectedIds: number[] = [];
  public selection_setttins: EntitySelectSettings = <EntitySelectSettings>{
    getUrl: 'get/school/all',
    listNameMembers: ['name'],
    listTitleMembers: ['id', { location: ['postalcode', 'city'] }],
    header: I18n.resolve('person_school'),
    maxSelection: 1,
    showCreateButton: true,
    editorUrl: '/logged/school/editor/',
  };


  public isLoaded = false;


  constructor(
    private route: ActivatedRoute,
    private ipc: IpcRendererService,
    private toastr: ToastrService,
    private router: Router) {
  }

  regenarate(): void {
    this.form_person = Object.assign(new Person(), { school: { id: null }, comments: [] }); // fallbacks

    this.form_com = new Communication();
    this.form_loc = new Location();
    this.isLoaded = false;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.regenarate();
      if (params && params['id'] && params['id'] > 0) {

        this.ipc.get('get/person/by/id', { id: params['id'] }).then((result: any) => {

          if (!ErrorRequest.hasError(result)) { // result.error has the error
            this.reassignPerson(result);
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
  reassignPerson(person: Person): void {
    this.form_person = Object.assign(this.form_person, person);
    this.form_com = Object.assign(this.form_com, person.communication);
    this.form_loc = Object.assign(this.form_loc, person.location);
    this.selection_selectedIds = this.form_person.school ? [this.form_person.school.id] : [];
  }

  public checkFinished(event: any, member: string) {
    // error gibt an obs error hat
    this.rememberReadyStatus[member] = event;

    // alle Werte readyStatusse auf ihre Negation filtern und falls Ergebnis Array länge 0 hat => true
    this.readyToSave = (Object.values(this.rememberReadyStatus).filter(x => !x).length === 0);
  }

  selectionSelected(event: number[]): void {
    this.form_person.school.id = (event && event.length) ? event[0] : null;
  }

  save(): void {
    if (!this.readyToSave) {
      return;
    }

    this.form_person.communication = this.form_com;
    this.form_person.location = this.form_loc;


    this.ipc.get('post/person', this.form_person).then((result: any) => {
      if (!ErrorRequest.hasError(result)) { // result.error has the error
        this.toastr.info(I18n.resolve('person_success'));
        this.router.navigateByUrl('/logged/person/editor/' + result.id);
      } else {
        this.toastr.error(I18n.resolve('person_error'));
      }
    });

  }

}
