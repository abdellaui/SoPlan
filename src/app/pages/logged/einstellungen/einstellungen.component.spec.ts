import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EinstellungenComponent } from './einstellungen.component';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { ElectronService } from 'ngx-electron';
import { HttpClientModule } from '@angular/common/http';
import { NgxElectronModule } from 'ngx-electron';

describe('EinstellungenComponent', () => {
  let component: EinstellungenComponent;
  let fixture: ComponentFixture<EinstellungenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EinstellungenComponent
      ],
      imports: [
        HttpClientModule,
        NgxElectronModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
      providers: [
        IpcRendererService,
        ElectronService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EinstellungenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
