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
import { SchoolEditorComponent } from './school/school-editor/school-editor.component';

@NgModule({
  declarations: [
    LoggedComponent,
    EinstellungenComponent,
    VeranstaltungenComponent,
    PersonEditorComponent,
    PersonListeComponent,
    SchoolEditorComponent
  ],
  imports: [
    CommonModule,
    LoggedRoutingModule,
    ComponentsModule,
    FormsModule
  ]
})
export class LoggedModule { }
