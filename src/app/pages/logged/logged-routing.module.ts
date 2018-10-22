import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationGuard } from '../../guards/authentication/authentication.guard';
import { EinstellungenComponent } from './einstellungen/einstellungen.component';
import { LoggedComponent } from './logged.component';
import { VeranstaltungenComponent } from '@pages/logged/veranstaltungen/veranstaltungen.component';

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
