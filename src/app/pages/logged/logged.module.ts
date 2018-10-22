import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from '@components/components.module';

import { EinstellungenComponent } from './einstellungen/einstellungen.component';
import { LoggedRoutingModule } from './logged-routing.module';
import { LoggedComponent } from './logged.component';
import { VeranstaltungenComponent } from '@pages/logged/veranstaltungen/veranstaltungen.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoggedComponent,
    EinstellungenComponent,
    VeranstaltungenComponent,
  ],
  imports: [
    CommonModule,
    LoggedRoutingModule,
    ComponentsModule,
    FormsModule,
  ]
})
export class LoggedModule { }
