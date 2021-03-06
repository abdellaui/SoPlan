import { CommonModule } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
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
  NbProgressBarModule,
  NbRadioModule,
  NbSelectModule,
  NbSidebarModule,
  NbSpinnerModule,
  NbTooltipModule,
  NbUserModule,
} from '@nebular/theme';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

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
import { PugSelectComponent } from './pug-select/pug-select.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { DateEditorComponent } from './table/date-editor/date-editor.component';
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
  DateRendererComponent,
  DateEditorComponent,
  PugSelectComponent
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
  NbDateFnsDateModule,
  NbButtonModule,
  NbTooltipModule,
  NbBadgeModule,
  NbMenuModule,
  NbContextMenuModule,
  NbSpinnerModule,
  NbProgressBarModule
];

@NgModule({
  entryComponents: [
    DateRendererComponent,
    DateEditorComponent
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
    NgxJsonViewerModule,
    PdfViewerModule
  ],
  exports: [
    ...nebularModules,
    ...declarations
  ],
  providers: [
    { provide: LOCALE_ID, useValue: localStorage.getItem('lang') || 'de' }
  ]
})
export class ComponentsModule { }
