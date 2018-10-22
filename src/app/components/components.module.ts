import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NbActionsModule,
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbLayoutModule,
  NbMenuModule,
  NbSidebarModule,
  NbThemeModule,
  NbUserModule,
  NbListModule
} from '@nebular/theme';

import { EinstellungAdministratorComponent } from './einstellung-administrator/einstellung-administrator.component';
import { EinstellungDatenbankComponent } from './einstellung-datenbank/einstellung-datenbank.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { EinstellungMailComponent } from '@components/einstellung-mail/einstellung-mail.component';


const declarations = [
  EinstellungAdministratorComponent,
  EinstellungDatenbankComponent,
  EinstellungMailComponent,
  SidemenuComponent
];

const nebularModules = [
  NbLayoutModule,
  NbSidebarModule,
  NbCardModule,
  NbCheckboxModule,
  NbButtonModule,
  NbAlertModule,
  NbActionsModule,
  NbUserModule,
  NbListModule
];

@NgModule({
  declarations: [
    ...declarations,
  ],
  imports: [
    NbThemeModule.forRoot({ name: 'default' }),
    NbMenuModule.forRoot(),
    CommonModule,
    FormsModule,
    ...nebularModules
  ],
  exports: [
    ...nebularModules,
    ...declarations
  ],
})
export class ComponentsModule { }
