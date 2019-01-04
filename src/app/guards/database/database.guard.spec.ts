/* tslint:disable:no-unused-variable */
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxElectronModule } from 'ngx-electron';
import { ToastrModule } from 'ngx-toastr';

import { DatabaseGuard } from './database.guard';


describe('DatabaseGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA,

      ],
      providers: [DatabaseGuard],
      imports: [
        RouterTestingModule.withRoutes([]),
        ToastrModule.forRoot(),
        NgxElectronModule,
        HttpClientModule
      ]
    });
  });

  it('should create DatabaseGuard', inject([DatabaseGuard], (service: DatabaseGuard) => {
    expect(service).toBeTruthy();
  }));
});
