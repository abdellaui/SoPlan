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
        RouterTestingModule.withRoutes([]),
        ToastrModule.forRoot(),
        NgxElectronModule,
        HttpClientModule
      ],
    });
  });

  it('should ...', inject([AuthenticationGuard], (service: AuthenticationGuard) => {
    expect(service).toBeTruthy();
  }));

  // TODO: should has no rights
  it('should has no rights', () => {
    expect(true).toBe(true);
  });
});
