import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VeranstaltungenComponent } from '@pages/logged/veranstaltungen/veranstaltungen.component';

import { AuthenticationGuard } from '../../guards/authentication/authentication.guard';
import { EinstellungenComponent } from './einstellungen/einstellungen.component';
import { LoggedComponent } from './logged.component';
import { PersonEditorComponent } from './person/person-editor/person-editor.component';
import { PersonListeComponent } from './person/person-liste/person-liste.component';
import { SchoolEditorComponent } from './school/school-editor/school-editor.component';
import { VenueEditorComponent } from './venue/venue-editor/venue-editor.component';
import { CertificateComponent } from './certificate/certificate.component';
import { BedroomEditorComponent } from './bedroom/bedroom-editor/bedroom-editor.component';
import { BedroomListeComponent } from './bedroom/bedroom-liste/bedroom-liste.component';

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
        path: 'person/editor/:id',
        component: PersonEditorComponent
      },
      {
        path: 'person/list',
        component: PersonListeComponent
      },
      {
        path: 'school/editor/:id',
        component: SchoolEditorComponent
      },
      {
        path: 'venue/editor/:id',
        component: VenueEditorComponent
      },
      {
        path: 'bedroom/editor/:id',
        component: BedroomEditorComponent
      },
      {
        path: 'bedroom/list',
        component: BedroomListeComponent
      },
      {
        path: 'certificate',
        component: CertificateComponent
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
