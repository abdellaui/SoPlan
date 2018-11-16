import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '@components/components.module';
import { VeranstaltungenComponent } from '@pages/logged/veranstaltungen/veranstaltungen.component';

import { EinstellungenComponent } from './einstellungen/einstellungen.component';
import { LoggedRoutingModule } from './logged-routing.module';
import { LoggedComponent } from './logged.component';
import { PersonEditorComponent } from './person/person-editor/person-editor.component';
import { PersonListeComponent } from './person/person-liste/person-liste.component';
import { TableComponent } from '@components/table/table.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SchoolEditorComponent } from './school/school-editor/school-editor.component';
import { VenueEditorComponent } from './venue/venue-editor/venue-editor.component';

@NgModule({
  entryComponents: [
    PersonEditorComponent,
    SchoolEditorComponent,
    VenueEditorComponent
  ],
  exports: [
    PersonEditorComponent,
    SchoolEditorComponent,
    VenueEditorComponent
  ],
  declarations: [
    LoggedComponent,
    EinstellungenComponent,
    VeranstaltungenComponent,
    PersonEditorComponent,
    PersonListeComponent,
    TableComponent,
    SchoolEditorComponent,
    VenueEditorComponent
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
