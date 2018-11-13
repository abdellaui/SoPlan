import { Component, OnInit } from '@angular/core';
import { Communication, CommunicationSchema } from '@entity/_communication/communicaton.entity';
import { Location, LocationSchema } from '@entity/_location/location.entity';
import { Person, PersonSchema } from '@entity/person/person.entity';

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


  constructor() {
    /*this.form_personInstance.surname = 'a';
    this.form_personInstance.birthDate = new Date();
    this.form_personInstance.gender = PersonGender.DIVERSE;*/
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
