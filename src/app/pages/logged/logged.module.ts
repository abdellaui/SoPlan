import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ComponentsModule } from '../../components/components.module';
import { EinstellungenComponent } from './einstellungen/einstellungen.component';
import { LoggedRoutingModule } from './logged-routing.module';
import { LoggedComponent } from './logged.component';

@NgModule({
  declarations: [
    LoggedComponent,
    EinstellungenComponent
  ],
  imports: [
    CommonModule,
    LoggedRoutingModule,
    ComponentsModule
  ]
})
export class LoggedModule { }
