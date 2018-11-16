import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EinstellungMailComponent } from '@components/einstellung-mail/einstellung-mail.component';
import {
  NbActionsModule,
  NbAlertModule,
  NbBadgeModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbInputModule,
  NbLayoutModule,
  NbListModule,
  NbMenuModule,
  NbRadioModule,
  NbSelectModule,
  NbSidebarModule,
  NbTooltipModule,
  NbUserModule,
} from '@nebular/theme';

import { EinstellungAdministratorComponent } from './einstellung-administrator/einstellung-administrator.component';
import { EinstellungDatenbankComponent } from './einstellung-datenbank/einstellung-datenbank.component';
import { EntitySelectComponent } from './entity-select/entity-select.component';
import { CheckboxComponent } from './form-builder/checkbox/checkbox.component';
import { DatepickerComponent } from './form-builder/datepicker/datepicker.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { InputComponent } from './form-builder/input/input.component';
import { RadiobuttonComponent } from './form-builder/radiobutton/radiobutton.component';
import { SelectboxComponent } from './form-builder/selectbox/selectbox.component';
import { TextareaComponent } from './form-builder/textarea/textarea.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

const declarations = [
  EinstellungAdministratorComponent,
  EinstellungDatenbankComponent,
  EinstellungMailComponent,
  SidemenuComponent,
  FormBuilderComponent,
  CheckboxComponent,
  DatepickerComponent,
  InputComponent,
  RadiobuttonComponent,
  SelectboxComponent,
  TextareaComponent,
  EntitySelectComponent
];

const nebularModules = [
  NbLayoutModule,
  NbSidebarModule,
  NbCheckboxModule,
  NbSelectModule,
  NbCardModule,
  NbAlertModule,
  NbRadioModule,
  NbActionsModule,
  NbUserModule,
  NbInputModule,
  NbListModule,
  NbDatepickerModule,
  NbButtonModule,
  NbTooltipModule,
  NbBadgeModule,
  NbMenuModule,
];

@NgModule({
  declarations: [
    ...declarations,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ...nebularModules,
    Ng2SmartTableModule,
  ],
  exports: [
    ...nebularModules,
    ...declarations
  ],
})
export class ComponentsModule { }
