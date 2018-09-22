import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationGuard } from './guards/authentication/authentication.guard';
import { DatabaseGuard } from './guards/database/database.guard';
import { DatabaseConnectionComponent } from './pages/database-connection/database-connection.component';
import { EinstellungenComponent } from './pages/einstellungen/einstellungen.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: 'logged',
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: '',
        component: EinstellungenComponent,
      },
      {
        path: 'einstellungen',
        component: EinstellungenComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [DatabaseGuard]
  },
  {
    path: 'databaseConnection',
    component: DatabaseConnectionComponent
  },
  {
    path: '**',
    redirectTo: 'admin'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
