import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NbMenuModule, NbSidebarService, NbThemeModule } from '@nebular/theme';
import { ElectronService } from 'ngx-electron';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
      imports: [
        BrowserModule,
        RouterTestingModule.withRoutes([]),
        NbThemeModule.forRoot({ name: 'default' }),
        NbMenuModule.forRoot(),
        HttpClientModule
      ],
      providers: [
        ElectronService,
        NbSidebarService,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.component;
    expect(app).toBeTruthy();
  }));


});
