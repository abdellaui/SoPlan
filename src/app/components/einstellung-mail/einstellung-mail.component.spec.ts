/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { EinstellungMailComponent } from './einstellung-mail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxElectronModule } from 'ngx-electron';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { MailConfig } from '@models/configs.class';

describe('EinstellungMailComponent', () => {
  let component: EinstellungMailComponent;
  let fixture: ComponentFixture<EinstellungMailComponent>;
  let ipc: IpcRendererService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EinstellungMailComponent,
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
    fixture = TestBed.createComponent(EinstellungMailComponent);
    component = fixture.componentInstance;
    ipc = TestBed.get(IpcRendererService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the config', () => {
    expect(ipc.get('get/mail/config')).toBeDefined();
  });

  // TODO: should save config (mail)
  it('should save config', () => {
    expect(true).toBeTruthy();
  });
});
