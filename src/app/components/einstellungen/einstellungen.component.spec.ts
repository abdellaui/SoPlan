import { HttpClientModule } from '@angular/common/http';
import { NgxElectronModule } from 'ngx-electron';
import { IpcRendererService } from './../../services/ipcRenderer.service';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EinstellungenComponent } from './einstellungen.component';
import { NbCardModule, NbAlertModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';

describe('EinstellungenComponent', () => {
  let component: EinstellungenComponent;
  let fixture: ComponentFixture<EinstellungenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EinstellungenComponent],
      imports: [
        NbCardModule,
        NbAlertModule,
        FormsModule,
        NgxElectronModule,
        HttpClientModule
      ],
      providers: [
        IpcRendererService
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
