import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Communication, CommunicationSchema } from '@entity/_communication/communicaton.entity';
import { Location, LocationSchema } from '@entity/_location/location.entity';
import { Person, PersonSchema } from '@entity/person/person.entity';
import { EntitySelectSettings, FormBuilderSettings } from '@models/componentInput.class';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-person-editor',
  templateUrl: './person-editor.component.html',
  styleUrls: ['./person-editor.component.scss']
})
export class PersonEditorComponent implements OnInit {
  public readyToSave = false;
  public rememberReadyStatus = {
    person: false,
    communication: false,
    location: false
  };

  public form_personInstance: Person;
  public form_personSchema = PersonSchema;
  public form_personSettings: FormBuilderSettings = <FormBuilderSettings>{
    header: 'Zur Person',
    buttons: false,
    paddings: { left: 'md-12', right: 'md-12' }
  };


  public form_comInstance: Communication;
  public form_comSchema = CommunicationSchema;
  public form_comSettings: FormBuilderSettings = <FormBuilderSettings>{
    header: 'Kommunikation',
    buttons: false
  };

  public form_locInstance: Location;
  public form_locSchema = LocationSchema;
  public form_locSettings: FormBuilderSettings = <FormBuilderSettings>{
    header: 'Anschrift',
    buttons: false
  };

  public selection_selectedIds: number[] = [];
  public selection_setttins: EntitySelectSettings = <EntitySelectSettings>{
    getUrl: 'get/school/all',
    listNameMembers: ['name'],
    listTitleMembers: ['id', { location: ['postalcode', 'city'] }],
    header: 'Schule',
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
    this.form_personInstance = Object.assign(new Person(), { school: { id: null }, comments: [] }); // fallbacks

    this.form_comInstance = new Communication();
    this.form_locInstance = new Location();
    this.isLoaded = false;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.regenarate();
      if (params && params['id'] && params['id'] > 0) {
        this.ipc.get('get/person/by/id', { id: params['id'] }).then((result: any) => {

          if (result !== 0) {
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
    person.birthDate = new Date(person.birthDate);
    this.form_personInstance = Object.assign(this.form_personInstance, person);
    this.form_comInstance = Object.assign(this.form_comInstance, person.communication);
    this.form_locInstance = Object.assign(this.form_locInstance, person.location);
    this.selection_selectedIds = [this.form_personInstance.school.id];
  }

  public checkFinished(event: any, member: string) {
    // error gibt an obs error hat
    this.rememberReadyStatus[member] = event;

    // alle Werte readyStatusse auf ihre Negation filtern und falls Ergebnis Array länge 0 hat => true
    this.readyToSave = (Object.values(this.rememberReadyStatus).filter(x => !x).length === 0);
  }

  selectionSelected(event: number[]): void {
    this.form_personInstance.school.id = (event && event.length) ? event[0] : null;
  }

  save(): void {
    if (!this.readyToSave) {
      return;
    }

    this.form_personInstance.communication = this.form_comInstance;
    this.form_personInstance.location = this.form_locInstance;


    this.ipc.get('post/person', this.form_personInstance).then((result: any) => {
      if (result !== 0) {
        this.toastr.info('Person wurde erfolgreich gespeichert!');
        this.router.navigateByUrl('/logged/person/editor/' + result.id);
      } else {
        this.toastr.error(`Fehler!`);
      }
    });

  }

}
