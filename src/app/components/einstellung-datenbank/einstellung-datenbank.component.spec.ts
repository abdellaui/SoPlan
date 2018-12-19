import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxElectronModule } from 'ngx-electron';
import { ToastrModule } from 'ngx-toastr';

import { IpcRendererService } from '../../services/ipc-renderer/ipc-renderer.service';
import { EinstellungDatenbankComponent } from './einstellung-datenbank.component';

describe('EinstellungenDatenbankComponent', () => {
  let component: EinstellungDatenbankComponent;
  let fixture: ComponentFixture<EinstellungDatenbankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EinstellungDatenbankComponent
      ],
      imports: [
        NgxElectronModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        RouterTestingModule.withRoutes([]),
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
    fixture = TestBed.createComponent(EinstellungDatenbankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: should save config (db)
  it('should save config', () => {
    expect(true).toBe(true);
  });

  // TODO: should set config (db)
  it('should set config', () => {
    expect(true).toBe(true);
  });
});
