/* tslint:disable:no-unused-variable */
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxElectronModule } from 'ngx-electron';
import { ToastrModule } from 'ngx-toastr';

import { IpcRendererService } from '../../services/ipc-renderer/ipc-renderer.service';
import { EinstellungAdministratorComponent } from './einstellung-administrator.component';

describe('EinstellungAdministratorComponent', () => {
  let component: EinstellungAdministratorComponent;
  let fixture: ComponentFixture<EinstellungAdministratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EinstellungAdministratorComponent,
      ],
      imports: [
        RouterTestingModule.withRoutes([]),
        NgxElectronModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        FormsModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
      providers: [
        IpcRendererService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EinstellungAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: should save config
  it('should save config (admin)', () => {
    expect(true).toBe(true);
  });

  // TODO: should check the password
  it('should check the password', () => {
    expect(true).toBe(true);
  });

  // TODO: should give response with toastr
  it('should give response with toastr', () => {
    expect(true).toBe(true);
  });
});
