import '../polyfills';
import 'reflect-metadata';
import 'zone.js/dist/zone-mix';

import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbLayoutModule,
  NbMenuModule,
  NbSidebarModule,
  NbSidebarService,
  NbThemeModule,
} from '@nebular/theme';
import { ElectronService, NgxElectronModule } from 'ngx-electron';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  EinstellungAdministratorComponent,
} from './components/einstellung-administrator/einstellung-administrator.component';
import { EinstellungDatenbankComponent } from './components/einstellung-datenbank/einstellung-datenbank.component';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { DatabaseConnectionComponent } from './pages/database-connection/database-connection.component';
import { EinstellungenComponent } from './pages/einstellungen/einstellungen.component';
import { LoginComponent } from './pages/login/login.component';


@NgModule({
    declarations: [
        AppComponent,
        SidemenuComponent,
        EinstellungenComponent,
        EinstellungDatenbankComponent,
        EinstellungAdministratorComponent,
        LoginComponent,
        DatabaseConnectionComponent
    ],
    imports: [
        // BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            timeOut: 10000,
            positionClass: 'toast-top-right',
            preventDuplicates: true,
        }),


        AppRoutingModule,

        // electron
        NgxElectronModule,
        // nebular
        NbThemeModule.forRoot({ name: 'default' }),
        NbLayoutModule,
        NbSidebarModule,
        NbMenuModule.forRoot(),
        NbCardModule,
        NbCheckboxModule,
        NbButtonModule,
        NbAlertModule
    ],
    providers: [ElectronService, NbSidebarService, { provide: APP_BASE_HREF, useValue: '/' }],
    bootstrap: [AppComponent]
})
export class AppModule { }
