import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location, LocationSchema } from '@entity/_location/location.entity';
import { School, SchoolSchema } from '@entity/school/school.entity';
import { FormBuilderSettings } from '@models/componentInput.class';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-school-editor',
  templateUrl: './school-editor.component.html',
  styleUrls: ['./school-editor.component.scss']
})
export class SchoolEditorComponent implements OnInit {


  public readyToSave = false;
  public rememberReadyStatus = {
    location: false,
    school: false
  };


  public form_schoolInstance: School;
  public form_schoolSchema = SchoolSchema;
  public form_schoolSettings: FormBuilderSettings = <FormBuilderSettings>{
    header: 'Information',
    buttons: false
  };


  public form_locInstance: Location;
  public form_locSchema = LocationSchema;
  public form_locSettings: FormBuilderSettings = <FormBuilderSettings>{
    header: 'Anschrift',
    buttons: false
  };

  public isLoaded = false;


  constructor(
    private route: ActivatedRoute,
    private ipc: IpcRendererService,
    private toastr: ToastrService) {
  }

  regenarate(): void {
    this.form_schoolInstance = new School();
    this.form_locInstance = new Location();
    this.isLoaded = false;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.regenarate();
      if (params && params['id'] && params['id'] > 0) {
        this.ipc.get('get/school/by/id', { id: params['id'] }).then((result: any) => {

          if (result !== 0) {
            this.reassignSchool(result);
          }
          this.isLoaded = true;
        });
      } else {
        this.isLoaded = true;
      }
    });
  }

  reassignSchool(school: School): void {
    this.form_schoolInstance = Object.assign(this.form_schoolInstance, school);
    this.form_locInstance = Object.assign(this.form_locInstance, school.location);
  }

  public checkFinished(event: any, member: string) {
    // error gibt an obs error hat
    this.rememberReadyStatus[member] = event;

    // alle Werte readyStatusse auf ihre Negation filtern und falls Ergebnis Array länge 0 hat => true
    this.readyToSave = (Object.values(this.rememberReadyStatus).filter(x => !x).length === 0);
  }

  save(): void {
    if (!this.readyToSave) {
      return;
    }

    this.form_schoolInstance.location = this.form_locInstance;


    this.ipc.get('post/school', this.form_schoolInstance).then((result: any) => {
      if (result !== 0) {
        this.toastr.info('SChule wurde erfolgreich gespeichert!');
        this.reassignSchool(result);
      } else {
        this.toastr.error(`Fehler!`);
      }
    });

  }
}
