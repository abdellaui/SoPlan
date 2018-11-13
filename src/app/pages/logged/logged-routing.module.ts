import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VeranstaltungenComponent } from '@pages/logged/veranstaltungen/veranstaltungen.component';

import { AuthenticationGuard } from '../../guards/authentication/authentication.guard';
import { EinstellungenComponent } from './einstellungen/einstellungen.component';
import { LoggedComponent } from './logged.component';
import { PersonEditorComponent } from './person-editor/person-editor.component';
import { PersonListeComponent } from './person-liste/person-liste.component';

const routes: Routes = [
  {
    path: '',
    component: LoggedComponent,
    canActivate: [AuthenticationGuard],
    canActivateChild: [AuthenticationGuard],
    children: [
      {
        path: 'einstellungen',
        component: EinstellungenComponent
      },
      {
        path: 'veranstaltungen',
        component: VeranstaltungenComponent
      },
      {
        path: 'person-editor/:id',
        component: PersonEditorComponent
      },
      {
        path: 'person-list',
        component: PersonListeComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoggedRoutingModule {
}
