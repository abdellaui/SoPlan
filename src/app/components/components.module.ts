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
} from '@nebular/theme';

import { EinstellungAdministratorComponent } from './einstellung-administrator/einstellung-administrator.component';
import { EinstellungDatenbankComponent } from './einstellung-datenbank/einstellung-datenbank.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';

const declarations = [
  EinstellungAdministratorComponent,
  EinstellungDatenbankComponent,
  SidemenuComponent
];
const nebularModules = [
  NbLayoutModule,
  NbSidebarModule,
  NbCardModule,
  NbCheckboxModule,
  NbButtonModule,
  NbAlertModule,
  NbActionsModule
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
