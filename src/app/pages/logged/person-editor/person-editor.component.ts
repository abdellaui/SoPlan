import { Component, OnInit } from '@angular/core';
import { Communication, CommunicationSchema } from '@entity/_communication/communicaton.entity';
import { Location, LocationSchema } from '@entity/_location/location.entity';
<<<<<<< HEAD
import { Person, PersonGender, PersonSchema } from '@entity/person/person.entity';
import { Room, RoomSchema } from '@entity/_room/room.entity';
import { Bedroom, BedroomSchema, BedroomTypes } from '@entity/bedroom/bedroom.entity';
import { Participant, ParticipantSchema, ParticipantRole } from '@entity/participant/participant.entity';
import { Group, GroupSchema } from '@entity/group/group.entity';
import { EventSchema, Event } from '@entity/event/event.entity';
import { Classroom, ClassroomSchema } from '@entity/classroom/classroom.entity';
import { School, SchoolSchema } from '@entity/school/school.entity';
import { Venue, VenueSchema } from '@entity/venue/venue.entity';
=======
import { Person, PersonSchema } from '@entity/person/person.entity';
>>>>>>> b2b2c556c3cc95c705f45d5bbe8be4bd30b882aa

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

  public form_personInstance: Person = new Person();
  public form_personSchema = PersonSchema;
  public form_personSettings = { header: 'Zur Person', buttons: false, paddings: { left: 'md-12', right: 'md-12' } };


  public form_comInstance: Communication = new Communication();
  public form_comSchema = CommunicationSchema;
  public form_comSettings = { header: 'Kommunikation', buttons: false };


  public form_locInstance: Location = new Location();
  public form_locSchema = LocationSchema;
  public form_locSettings = { header: 'Anschrift', buttons: false };

  public form_roomInstance: Room = new Room();
  public form_roomSchema = RoomSchema;
  public form_roomSettings = { header: 'Raumbeschreibung', buttons: false };

  public form_bedroomInstance: Bedroom = new Bedroom();
  public form_bedroomSchema = BedroomSchema;
  public form_bedroomSettings = { header: 'Schlafraum', buttons: false };

  public form_participantInstance: Participant = new Participant();
  public form_participantSchema = ParticipantSchema;
  public form_participantSettings = { header: 'Teilnehmer', buttons: false };

  public form_groupInstance: Group = new Group();
  public form_groupSchema = GroupSchema;
  public form_groupSettings = { header: 'Gruppe', buttons: false };

  public form_eventInstance: Event = new Event();
  public form_eventSchema = EventSchema;
  public form_eventSettings = { header: 'Event', buttons: false };

  public form_classroomInstance: Classroom = new Classroom();
  public form_classroomSchema = ClassroomSchema;
  public form_classroomSettings = { header: 'Klassenraum', buttons: false };

  public form_schoolInstance: School = new School();
  public form_schoolSchema = SchoolSchema;
  public form_schoolSettings = { header: 'Schule', buttons: false };

  public form_venueInstance: Venue = new Venue();
  public form_venueSchema = VenueSchema;
  public form_venueSettings = { header: 'Austragungort', buttons: false };




  constructor() {
<<<<<<< HEAD
    this.form_comInstance.mail = 'max.muster@web.de';
    this.form_comInstance.mobile = '00000000000';
    this.form_comInstance.phone = '11111111111';


    this.form_personInstance.firstname = 'Max';
    this.form_personInstance.surname = 'Mustermann';
    this.form_personInstance.birthDate = new Date();
    this.form_personInstance.gender = PersonGender.MALE;

    this.form_locInstance.city = 'Musterstadt';
    this.form_locInstance.country = 'Musterland';
    this.form_locInstance.postalcode = '44444';
    this.form_locInstance.street = 'Musterstraße';
    this.form_locInstance.subThoroughfare = '22a';

    this.form_roomInstance.capacity = 22;
    this.form_roomInstance.corridor = 'eins';
    this.form_roomInstance.floor = '1';
    this.form_roomInstance.name = 'Schlafraum';
    this.form_roomInstance.number = 1;

    this.form_bedroomInstance.type = BedroomTypes.DOZENT;

    this.form_classroomInstance.identifier = 'Großer Raum Links';

    this.form_participantInstance.role = ParticipantRole.DOZENT;

    this.form_groupInstance.capacity = 22;
    this.form_groupInstance.name = 'Mustergruppe';

    this.form_venueInstance.name = 'Mustervenue';
    this.form_venueInstance.contactPerson = 'Musterkontakt';

    this.form_eventInstance.name = 'Musterevent';

    this.form_schoolInstance.name = 'Musterschule';

=======
    /*this.form_personInstance.surname = 'a';
    this.form_personInstance.birthDate = new Date();
    this.form_personInstance.gender = PersonGender.DIVERSE;*/
>>>>>>> b2b2c556c3cc95c705f45d5bbe8be4bd30b882aa
  }

  ngOnInit() {
  }

  checkFinished(event: any, member: string) {
    // wenns kein error gibt => event = leeres Object
    this.rememberReadyStatus[member] = (JSON.stringify(event) === '{}');

    // alle Werte readyStatusse auf ihre Negation filtern und falls Ergebnis Array länge 0 hat => true
    this.readyToSave = (Object.values(this.rememberReadyStatus).filter(x => !x).length === 0);
    console.log(this.rememberReadyStatus);
  }

  save(): void {
    if (!this.readyToSave) {
      return;
    }


    this.form_personInstance.communication = this.form_comInstance;
    this.form_personInstance.location = this.form_locInstance;
  }

}
