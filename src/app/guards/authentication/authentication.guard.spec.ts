/* tslint:disable:no-unused-variable */
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxElectronModule } from 'ngx-electron';
import { ToastrModule } from 'ngx-toastr';

import { AuthenticationGuard } from './authentication.guard';


describe('AuthenticationGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA,

      ],
      providers: [AuthenticationGuard],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'auth',
            redirectTo: '/'
          }
        ]),
        ToastrModule.forRoot(),
        NgxElectronModule,
        HttpClientModule
      ],
    });
  });

  it('should ...', inject([AuthenticationGuard], (service: AuthenticationGuard) => {
    expect(service).toBeTruthy();
  }));

  it('should has no right', inject([AuthenticationGuard], (service: AuthenticationGuard) => {
    expect(service.hasRight()).toBe(false);
  }));

  it('should has right', inject([AuthenticationGuard], (service: AuthenticationGuard) => {
    localStorage.setItem('administrator', JSON.stringify({ username: 'admin', password: 'password' }));
    localStorage.setItem('databaseConnection', 'true');
    expect(service.hasRight()).toBe(true);
  }));

  it('should can load the route', inject([AuthenticationGuard], (service: AuthenticationGuard) => {
    localStorage.setItem('administrator', JSON.stringify({ username: 'admin', password: 'password' }));
    localStorage.setItem('databaseConnection', 'true');
    expect(service.canLoad({ path: '/' })).toBe(true);
  }));

  it('should can\'t load the route', inject([AuthenticationGuard], (service: AuthenticationGuard) => {
    expect(service.canLoad({ path: '/' })).toBe(false);
  }));

});
