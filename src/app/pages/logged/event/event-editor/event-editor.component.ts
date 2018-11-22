import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event, EventSchema } from '@entity/event/event.entity';
import { EntitySelectSettings, FormBuilderSettings } from '@models/componentInput.class';
import { CurrentEventService } from '@services/current-event/current-event.service';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss']
})
export class EventEditorComponent implements OnInit {
  public readyToSave = false;
  public rememberReadyStatus = {
    event: false
  };

  public isLoaded = false;


  public form_eventInstance: Event;
  public form_eventSchema = EventSchema;
  public form_eventSettings: FormBuilderSettings = <FormBuilderSettings>{
    header: 'Veranstaltung',
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
    private toastr: ToastrService,
    private currentEventService: CurrentEventService
  ) { }

  regenarate(): void {
    this.form_eventInstance = new Event();
    this.isLoaded = false;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.regenarate();
      if (params && params['id'] && params['id'] > 0) {
        this.ipc.get('get/event/by/id', { id: params['id'] }).then((result: any) => {

          if (result !== 0) {
            this.reassignEvent(result);
          }
          this.isLoaded = true;
        });
      } else {
        this.isLoaded = true;
      }
    });
  }

  reassignEvent(event: Event): void {
    this.form_eventInstance = Object.assign(this.form_eventInstance, event);
    this.selection_selectedIds = [this.form_eventInstance.hostingId];
  }

  checkFinished(event: any, member: string) {
    // error gibt an obs error hat
    this.rememberReadyStatus[member] = event;

    // alle Werte readyStatusse auf ihre Negation filtern und falls Ergebnis Array länge 0 hat => true
    this.updateReadyToSave();
  }

  updateReadyToSave(): void {
    // alle Werte readyStatusse auf ihre Negation filtern und falls Ergebnis Array länge 0 hat => true
    this.readyToSave = (Object.values(this.rememberReadyStatus).filter(x => !x).length === 0 && this.form_eventInstance.hostingId > 0);
  }
  selectionSelected(event: number[]): void {
    this.form_eventInstance.hostingId = (event && event.length) ? event[0] : null;
    this.updateReadyToSave();
  }
  save(): void {
    if (!this.readyToSave) {
      return;
    }



    this.ipc.get('post/event', this.form_eventInstance).then((result: any) => {
      if (result !== 0) {
        this.toastr.info('Veranstaltung wurde erfolgreich gespeichert!');
        this.reassignEvent(result);
        this.currentEventService.refreshEvents();
      } else {
        this.toastr.error(`Fehler!`);
      }
    });

  }
}
