import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import '../polyfills';

// angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
// electron
import { NgxElectronModule, ElectronService } from 'ngx-electron';

// nebular
import {
  NbThemeModule, NbSidebarService, NbLayoutModule, NbSidebarModule,
  NbMenuModule, NbCardModule, NbCheckboxModule, NbButtonModule, NbAlertModule
} from '@nebular/theme';

// custom
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { EinstellungenComponent } from './components/einstellungen/einstellungen.component';


@NgModule({
  declarations: [
    AppComponent,
    SidemenuComponent,
    EinstellungenComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,

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
