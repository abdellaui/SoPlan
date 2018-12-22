import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationGuard } from '../../guards/authentication/authentication.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EinstellungenComponent } from './einstellungen/einstellungen.component';
import { EventEditorComponent } from './event/event-editor/event-editor.component';
import { EventListeComponent } from './event/event-liste/event-liste.component';
import { GroupEditorComponent } from './event/group/group-editor/group-editor.component';
import { GroupListeComponent } from './event/group/group-liste/group-liste.component';
import { ParticipantEditorComponent } from './event/participant/participant-editor/participant-editor.component';
import { ParticipantListeComponent } from './event/participant/participant-liste/participant-liste.component';
import { LoggedComponent } from './logged.component';
import { PersonEditorComponent } from './person/person-editor/person-editor.component';
import { PersonListeComponent } from './person/person-liste/person-liste.component';
import { SchoolEditorComponent } from './school/school-editor/school-editor.component';
import { SchoolListeComponent } from './school/school-liste/school-liste.component';
import { BedroomEditorComponent } from './venue/bedroom/bedroom-editor/bedroom-editor.component';
import { BedroomListeComponent } from './venue/bedroom/bedroom-liste/bedroom-liste.component';
import { ClassroomEditorComponent } from './venue/classroom/classroom-editor/classroom-editor.component';
import { ClassroomListeComponent } from './venue/classroom/classroom-liste/classroom-liste.component';
import { VenueEditorComponent } from './venue/venue-editor/venue-editor.component';
import { VenueListeComponent } from './venue/venue-liste/venue-liste.component';

const routes: Routes = [
  {
    path: '',
    component: LoggedComponent,
    canActivate: [AuthenticationGuard],
    canActivateChild: [AuthenticationGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'einstellungen',
        component: EinstellungenComponent
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
        path: 'school/list',
        component: SchoolListeComponent,
      },
      {
        path: 'venue/editor/:id',
        component: VenueEditorComponent
      },
      {
        path: 'venue/list',
        component: VenueListeComponent
      },
      {
        path: 'venue/bedroom/editor/:venueId/:id',
        component: BedroomEditorComponent
      },
      {
        path: 'venue/bedroom/list',
        component: BedroomListeComponent
      },
      {
        path: 'venue/classroom/editor/:venueId/:id',
        component: ClassroomEditorComponent
      },
      {
        path: 'venue/classroom/list',
        component: ClassroomListeComponent
      },
      {
        path: 'event/editor/:id',
        component: EventEditorComponent
      },
      {
        path: 'event/list',
        component: EventListeComponent
      },
      {
        path: 'event/group/editor/:eventId/:id',
        component: GroupEditorComponent
      },
      {
        path: 'event/group/list',
        component: GroupListeComponent
      },
      {
        path: 'event/participant/editor/:eventId/:id',
        component: ParticipantEditorComponent
      },
      {
        path: 'event/participant/list',
        component: ParticipantListeComponent
      },
      {
        path: '**',
        redirectTo: 'dashboard'
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoggedRoutingModule {
}
