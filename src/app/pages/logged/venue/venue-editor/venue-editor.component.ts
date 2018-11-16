import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Communication, CommunicationSchema } from '@entity/_communication/communicaton.entity';
import { Location, LocationSchema } from '@entity/_location/location.entity';
import { Venue, VenueSchema } from '@entity/venue/venue.entity';
import { FormBuilderSettings } from '@models/componentInput.class';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-venue-editor',
  templateUrl: './venue-editor.component.html',
  styleUrls: ['./venue-editor.component.scss']
})
export class VenueEditorComponent implements OnInit {

  public readyToSave = false;
  public rememberReadyStatus = {
    venue: false,
    location: false,
    communication: false
  };


  public form_venueInstance: Venue;
  public form_venueSchema = VenueSchema;
  public form_venueSettings: FormBuilderSettings = <FormBuilderSettings>{
    header: 'Information',
    buttons: false
  };


  public form_locInstance: Location;
  public form_locSchema = LocationSchema;
  public form_locSettings: FormBuilderSettings = <FormBuilderSettings>{
    header: 'Anschrift',
    buttons: false
  };

  public form_comInstance: Communication;
  public form_comSchema = CommunicationSchema;
  public form_comSettings: FormBuilderSettings = <FormBuilderSettings>{
    header: 'Kommunikation',
    buttons: false
  };

  public isLoaded = false;


  constructor(
    private route: ActivatedRoute,
    private ipc: IpcRendererService,
    private toastr: ToastrService) {
  }

  regenarate(): void {
    this.form_venueInstance = new Venue();
    this.form_comInstance = new Communication();
    this.form_locInstance = new Location();
    this.isLoaded = false;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.regenarate();
      if (params && params['id'] && params['id'] > 0) {
        this.ipc.get('get/venue/by/id', { id: params['id'] }).then((result: any) => {

          if (result !== 0) {
            this.reassignVenue(result);
          }
          this.isLoaded = true;
        });
      } else {
        this.isLoaded = true;
      }
    });
  }

  reassignVenue(venue: Venue): void {
    this.form_venueInstance = Object.assign(this.form_venueInstance, venue);
    this.form_comInstance = Object.assign(this.form_comInstance, venue.communication);
    this.form_locInstance = Object.assign(this.form_locInstance, venue.location);
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

    this.form_venueInstance.communication = this.form_comInstance;
    this.form_venueInstance.location = this.form_locInstance;


    this.ipc.get('post/venue', this.form_venueInstance).then((result: any) => {
      if (result !== 0) {
        this.toastr.info('Venue wurde erfolgreich gespeichert!');
        this.reassignVenue(result);
      } else {
        this.toastr.error(`Fehler!`);
      }
    });

  }

}
