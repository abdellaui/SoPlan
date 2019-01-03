/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { EinstellungMailComponent } from './einstellung-mail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxElectronModule } from 'ngx-electron';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { MailConfig } from '@models/configs.class';

describe('EinstellungMailComponent', () => {
  let component: EinstellungMailComponent;
  let fixture: ComponentFixture<EinstellungMailComponent>;
  let ipc: IpcRendererService;
  let toastr: ToastrService;

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
        IpcRendererService,
        ToastrService
      ]
    })
      .compileComponents();

    ipc = TestBed.get(IpcRendererService);
    toastr = TestBed.get(ToastrService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EinstellungMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(toastr, 'info');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the config', () => {
    expect(ipc.get('get/mail/config')).toBeDefined();
  });

  it('should set config', () => {
    let config: MailConfig = {
      host: 'smtp.gmail.com',
      port: 587,
      user: 'test@mail.com',
      pass: 'password'
    };

    config = Object.assign(new MailConfig(), config);

    component.setConfig(config);

    expect(component.config).toEqual(config);
  });

  it('should save config', async () => {
    const config: MailConfig = {
      host: 'smtp.gmail.com',
      port: 587,
      user: 'test@mail.com',
      pass: 'password'
    };

    component.setConfig(config);
    component.saveConfig();
    const result = await ipc.get('get/mail/config');

    expect(result).toEqual(config);
  });

  it('should give info that settings are saved', () => {
    let config: MailConfig = {
      host: 'smtp.gmail.com',
      port: 587,
      user: 'test@mail.com',
      pass: 'password'
    };

    config = Object.assign(new MailConfig(), config);

    component.setConfig(config);
    component.saveConfig();

    expect(toastr.info).toHaveBeenCalledWith('SMTP-Daten wurde erfolgreich konfiguriert!');
  });
});
