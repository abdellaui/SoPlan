import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '@components/components.module';
import { TableComponent } from '@components/table/table.component';
import { VeranstaltungenComponent } from '@pages/logged/veranstaltungen/veranstaltungen.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { EinstellungenComponent } from './einstellungen/einstellungen.component';
import { EventEditorComponent } from './event/event-editor/event-editor.component';
import { EventListeComponent } from './event/event-liste/event-liste.component';
import { LoggedRoutingModule } from './logged-routing.module';
import { LoggedComponent } from './logged.component';
import { PersonEditorComponent } from './person/person-editor/person-editor.component';
import { PersonListeComponent } from './person/person-liste/person-liste.component';
import { SchoolEditorComponent } from './school/school-editor/school-editor.component';
import { SchoolListeComponent } from './school/school-liste/school-liste.component';
import { BedroomEditorComponent } from './venue/bedroom/bedroom-editor/bedroom-editor.component';
import { BedroomListeComponent } from './venue/bedroom/bedroom-liste/bedroom-liste.component';
import { ClassroomEditorComponent } from './venue/classroom/classroom-editor/classroom-editor.component';
import { ClassroomListeComponent } from './venue/classroom/classroom-liste/classroom-liste.component';
import { VenueEditorComponent } from './venue/venue-editor/venue-editor.component';
import { VenueListeComponent } from './venue/venue-liste/venue-liste.component';

@NgModule({
  declarations: [
    LoggedComponent,
    EinstellungenComponent,
    VeranstaltungenComponent,
    PersonEditorComponent,
    PersonListeComponent,
    TableComponent,
    SchoolEditorComponent,
    SchoolListeComponent,
    VenueEditorComponent,
    VenueListeComponent,
    EventListeComponent,
    EventEditorComponent,
    BedroomEditorComponent,
    BedroomListeComponent,
    ClassroomEditorComponent,
    ClassroomListeComponent
  ],
  imports: [
    CommonModule,
    LoggedRoutingModule,
    ComponentsModule,
    FormsModule,
    Ng2SmartTableModule,
  ]
})
export class LoggedModule { }
