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
import { NbDatepickerModule, NbMenuModule, NbSidebarModule, NbSidebarService, NbThemeModule } from '@nebular/theme';
import { ChartsModule } from 'ng2-charts';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ElectronService, NgxElectronModule } from 'ngx-electron';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrentEventService } from '@services/current-event/current-event.service';
import { HistoryMemoryService } from '@services/history-memory/history-memory.service';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';

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
    ChartsModule,

    // route
    AppRoutingModule,
    RouterModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbDatepickerModule.forRoot(),
    NbMenuModule.forRoot(),
    NbSidebarModule.forRoot(),

    // toastr
    ToastrModule.forRoot({
      timeOut: 3000,
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
    CurrentEventService,
    HistoryMemoryService,
    IpcRendererService,
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LOCALE_ID, useValue: localStorage.getItem('lang') || 'de' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(localeDe);
  }
}
