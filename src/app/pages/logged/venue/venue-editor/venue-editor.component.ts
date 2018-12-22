import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Communication, CommunicationSchema } from '@entity/_communication/communicaton.entity';
import { Location, LocationSchema } from '@entity/_location/location.entity';
import { Room, RoomSchema } from '@entity/_room/room.entity';
import { Bedroom, BedroomSchema } from '@entity/bedroom/bedroom.entity';
import { Classroom, ClassroomSchema } from '@entity/classroom/classroom.entity';
import { Venue, VenueSchema } from '@entity/venue/venue.entity';
import { FormBuilderSettings, SmartTableConfig } from '@models/componentInput.class';
import { ErrorRequest } from '@models/errorRequest.class';
import { I18n } from '@models/translation/i18n.class';
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


  public form_venue: Venue;
  public form_venueSchema = VenueSchema;
  public form_venueSettings: FormBuilderSettings = <FormBuilderSettings>{
    header: I18n.resolve('venue_info'),
    buttons: false
  };


  public form_loc: Location;
  public form_locSchema = LocationSchema;
  public form_locSettings: FormBuilderSettings = <FormBuilderSettings>{
    header: I18n.resolve('venue_adress'),
    buttons: false
  };

  public form_com: Communication;
  public form_comSchema = CommunicationSchema;
  public form_comSettings: FormBuilderSettings = <FormBuilderSettings>{
    header: I18n.resolve('venue_communication'),
    buttons: false
  };

  public isLoaded = false;
  public st_bed_config: SmartTableConfig = {
    settings: {
      header: I18n.resolve('venue_bedroom'),
      showCreateButton: true,
      createButtonText: I18n.resolve('venue_new')
    },
    slotUrls: {
      getUrl: 'get/venue/bedrooms',
      postUrl: 'post/bedroom',
      deleteUrl: 'delete/bedroom',
      editorUrl: '/logged/venue/bedroom/editor/0/',
      getParam: { id: 0 }
    },
    instanceMap: {
      '': Bedroom.prototype,
      'room': Room.prototype
    },
    memberList: [
      {
        prefix: '',
        schema: BedroomSchema,
        members: ['type']
      },
      {
        prefix: 'room@',
        schema: RoomSchema,
        members: ['floor', 'corridor', 'number', 'name', 'capacity']
      },
    ]
  };
  public st_class_config: SmartTableConfig = {
    settings: {
      header: I18n.resolve('venue_classlist'),
      showCreateButton: true,
      createButtonText: I18n.resolve('venue_new')
    },
    slotUrls: {
      getUrl: 'get/venue/classrooms',
      postUrl: 'post/classroom',
      deleteUrl: 'delete/classroom',
      editorUrl: '/logged/venue/classroom/editor/0/',
      getParam: { id: 0 }
    },
    instanceMap: {
      '': Classroom.prototype,
      'room': Room.prototype
    },
    memberList: [
      {
        prefix: '',
        schema: ClassroomSchema,
        members: ['identifier']
      },
      {
        prefix: 'room@',
        schema: RoomSchema,
        members: ['floor', 'corridor', 'number', 'name', 'capacity']
      }
    ]
  };

  constructor(
    private route: ActivatedRoute,
    private ipc: IpcRendererService,
    private toastr: ToastrService,
    private router: Router) {
  }

  regenarate(): void {
    this.form_venue = Object.assign(new Venue(), { comments: [] }); // fallback
    this.form_com = new Communication();
    this.form_loc = new Location();
    this.isLoaded = false;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.regenarate();
      if (params && params['id'] && params['id'] > 0) {
        this.ipc.get('get/venue/by/id', { id: params['id'] }).then((result: any) => {

          if (!ErrorRequest.hasError(result)) { // result.error has the error
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
    this.form_venue = Object.assign(this.form_venue, venue);
    this.form_com = Object.assign(this.form_com, venue.communication);
    this.form_loc = Object.assign(this.form_loc, venue.location);

    const appendingId = (this.form_venue.id) ? this.form_venue.id : 0;

    this.st_bed_config.slotUrls.getParam = { id: appendingId };
    this.st_bed_config.slotUrls.editorUrl = `/logged/venue/bedroom/editor/${appendingId}/`;

    this.st_class_config.slotUrls.getParam = { id: appendingId };
    this.st_class_config.slotUrls.editorUrl = `/logged/venue/classroom/editor/${appendingId}/`;
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

    this.form_venue.communication = this.form_com;
    this.form_venue.location = this.form_loc;


    this.ipc.get('post/venue', this.form_venue).then((result: any) => {
      if (!ErrorRequest.hasError(result)) { // result.error has the error
        this.toastr.info(I18n.resolve('venue_success'));
        this.router.navigateByUrl('/logged/venue/editor/' + result.id);
      } else {
        this.toastr.error(I18n.resolve('venue_error'));
      }
    });

  }

}
