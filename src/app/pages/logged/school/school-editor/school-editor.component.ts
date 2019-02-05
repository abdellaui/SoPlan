import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location, LocationSchema } from '@entity/_location/location.entity';
import { School, SchoolSchema } from '@entity/school/school.entity';
import { FormBuilderSettings } from '@models/componentInput.class';
import { ErrorRequest } from '@models/errorRequest.class';
import { I18n } from '@models/translation/i18n.class';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-school-editor',
  templateUrl: './school-editor.component.html',
  styleUrls: ['./school-editor.component.scss']
})
export class SchoolEditorComponent implements OnInit {

  public _i18n = I18n;
  public readyToSave = false;
  public rememberReadyStatus = {
    location: false,
    school: false
  };


  public form_school: School;
  public form_schoolSchema = SchoolSchema;
  public form_schoolSettings: FormBuilderSettings = <FormBuilderSettings>{
    header: I18n.resolve('school_info'),
    buttons: false
  };


  public form_loc: Location;
  public form_locSchema = LocationSchema;
  public form_locSettings: FormBuilderSettings = <FormBuilderSettings>{
    header: I18n.resolve('school_address'),
    buttons: false
  };

  public isLoaded = false;


  constructor(
    private route: ActivatedRoute,
    private ipc: IpcRendererService,
    private toastr: ToastrService,
    private router: Router) {
  }

  regenarate(): void {
    this.form_school = Object.assign(new School(), { comments: [] }); // fallbacks
    this.form_loc = new Location();
    this.isLoaded = false;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.regenarate();
      if (params && params['id'] && params['id'] > 0) {
        this.ipc.get('get/school/by/id', { id: params['id'] }).then((result: any) => {

          if (!ErrorRequest.hasError(result)) { // result.error has the error
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
    this.form_school = Object.assign(this.form_school, school);
    this.form_loc = Object.assign(this.form_loc, school.location);
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

    this.form_school.location = this.form_loc;

    this.ipc.get('post/school', this.form_school).then((result: any) => {
      if (!ErrorRequest.hasError(result)) { // result.error has the error
        this.toastr.info(I18n.resolve('school_success'));
        this.router.navigateByUrl('/logged/school/editor/' + result.id);
      } else {
        this.toastr.error(I18n.resolve('school_error'));
      }
    });

  }
}
