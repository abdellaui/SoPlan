import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxElectronModule } from 'ngx-electron';
import { ToastrModule } from 'ngx-toastr';

import { DatabaseConnectionComponent } from '../../pages/database-connection/database-connection.component';
import { EinstellungenComponent } from '../../pages/einstellungen/einstellungen.component';
import { LoginComponent } from '../../pages/login/login.component';
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
});
