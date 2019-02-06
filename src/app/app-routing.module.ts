import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from '@components/components.module';
import { AuthenticationGuard } from '@guards/authentication/authentication.guard';
import { DatabaseGuard } from '@guards/database/database.guard';
import { DatabaseConnectionComponent } from '@pages/database-connection/database-connection.component';
import { LoginComponent } from '@pages/login/login.component';

const routes: Routes = [
  {
    path: 'logged',
    canLoad: [AuthenticationGuard],
    loadChildren: './pages/logged/logged.module#LoggedModule'
  },
  {
    path: 'auth/:method',
    component: LoginComponent,
    canActivate: [DatabaseGuard]
  },
  {
    path: 'databaseConnection',
    component: DatabaseConnectionComponent
  },
  {
    path: '**',
    redirectTo: 'logged'
  }
];

@NgModule({
  declarations: [
    LoginComponent,
    DatabaseConnectionComponent
  ],
  imports: [
    FormsModule,
    RouterModule.forRoot(routes, { useHash: true }),
    ComponentsModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
