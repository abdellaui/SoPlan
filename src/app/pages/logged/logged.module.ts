import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '@components/components.module';
import { VeranstaltungenComponent } from '@pages/logged/veranstaltungen/veranstaltungen.component';

import { EinstellungenComponent } from './einstellungen/einstellungen.component';
import { LoggedRoutingModule } from './logged-routing.module';
import { LoggedComponent } from './logged.component';
import { PersonEditorComponent } from './person-editor/person-editor.component';

@NgModule({
  declarations: [
    LoggedComponent,
    EinstellungenComponent,
    VeranstaltungenComponent,
    PersonEditorComponent,
  ],
  imports: [
    CommonModule,
    LoggedRoutingModule,
    ComponentsModule,
    FormsModule,
  ]
})
export class LoggedModule { }
