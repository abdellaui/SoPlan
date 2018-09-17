import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ElectronService, NgxElectronModule } from 'ngx-electron';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {
  NbThemeModule, NbLayoutModule, NbSidebarModule,
  NbMenuModule, NbCardModule, NbCheckboxModule, NbButtonModule, NbAlertModule, NbSidebarService
} from '@nebular/theme';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { EinstellungenComponent } from './components/einstellungen/einstellungen.component';
import { APP_BASE_HREF } from '@angular/common';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
      providers: [ElectronService, NbSidebarService, { provide: APP_BASE_HREF, useValue: '/' }]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));


});
