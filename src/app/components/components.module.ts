import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EinstellungMailComponent } from '@components/einstellung-mail/einstellung-mail.component';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import {
  NbActionsModule,
  NbAlertModule,
  NbBadgeModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbContextMenuModule,
  NbDatepickerModule,
  NbInputModule,
  NbLayoutModule,
  NbListModule,
  NbMenuModule,
  NbPopoverModule,
  NbRadioModule,
  NbSelectModule,
  NbSidebarModule,
  NbTooltipModule,
  NbUserModule,
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { EinstellungAdministratorComponent } from './einstellung-administrator/einstellung-administrator.component';
import { EinstellungDatenbankComponent } from './einstellung-datenbank/einstellung-datenbank.component';
import { EntityCommentComponent } from './entity-comment/entity-comment.component';
import { EntitySelectComponent } from './entity-select/entity-select.component';
import { CheckboxComponent } from './form-builder/checkbox/checkbox.component';
import { DatepickerComponent } from './form-builder/datepicker/datepicker.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { InputComponent } from './form-builder/input/input.component';
import { RadiobuttonComponent } from './form-builder/radiobutton/radiobutton.component';
import { SelectboxComponent } from './form-builder/selectbox/selectbox.component';
import { TextareaComponent } from './form-builder/textarea/textarea.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { DateRendererComponent } from './table/date-renderer/date-renderer.component';

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
  EntitySelectComponent,
  EntityCommentComponent,
  DateRendererComponent
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
  NbPopoverModule,
  NbInputModule,
  NbListModule,
  NbDatepickerModule,
  NbButtonModule,
  NbTooltipModule,
  NbBadgeModule,
  NbMenuModule,
  NbContextMenuModule,
];

@NgModule({
  entryComponents: [
    DateRendererComponent
  ],
  declarations: [
    ...declarations,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ...nebularModules,
    Ng2SmartTableModule,
    NbDateFnsDateModule,
  ],
  exports: [
    ...nebularModules,
    ...declarations
  ]
})
export class ComponentsModule { }
