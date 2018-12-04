import '../polyfills';
import 'reflect-metadata';
import 'zone.js/dist/zone-mix';

import { APP_BASE_HREF, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeDe from '@angular/common/locales/de';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '@components/components.module';
import { NbDateFnsDateModule, NbDateFnsDateService } from '@nebular/date-fns';
import {
  NbDatepickerModule,
  NbDateService,
  NbMenuModule,
  NbSidebarModule,
  NbSidebarService,
  NbThemeModule,
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ElectronService, NgxElectronModule } from 'ngx-electron';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    Ng2SmartTableModule,
    // route
    AppRoutingModule,
    RouterModule,
    NbDateFnsDateModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbDatepickerModule.forRoot(),
    NbMenuModule.forRoot(),
    NbSidebarModule.forRoot(),

    // toastr
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),

    // electron
    NgxElectronModule,

    // custom components
    ComponentsModule,
  ],
  providers: [
    ElectronService,
    NbSidebarService,
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LOCALE_ID, useValue: 'de' },
    { provide: NbDateService, useClass: NbDateFnsDateService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(localeDe);
  }
}
