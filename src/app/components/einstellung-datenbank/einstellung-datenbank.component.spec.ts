import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxElectronModule } from 'ngx-electron';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { IpcRendererService } from '../../services/ipc-renderer/ipc-renderer.service';
import { EinstellungDatenbankComponent } from './einstellung-datenbank.component';
import { DatabaseConfig } from '@models/configs.class';

describe('EinstellungenDatenbankComponent', () => {
  let component: EinstellungDatenbankComponent;
  let fixture: ComponentFixture<EinstellungDatenbankComponent>;
  let ipc: IpcRendererService;
  let toastr: ToastrService;

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
        IpcRendererService,
        ToastrService
      ]
    })
      .compileComponents();

    ipc = TestBed.get(IpcRendererService);
    toastr = TestBed.get(ToastrService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EinstellungDatenbankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(toastr, 'info');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save config', async () => {
    const config: DatabaseConfig = {
      host: 'localhost',
      port: '3306',
      username: 'root',
      password: '00005252',
      database: 'angular'
    };

    component.setConfig(config);

    await component.saveConfig();

    try {
      const expectConfig: DatabaseConfig = await ipc.get<DatabaseConfig>('get/database/config');

      await expect(config).toEqual(expectConfig);
    } catch (e) {
      console.log(e);
      return false;
    }

  });

  it('should set config', async () => {
    let config: DatabaseConfig = {
      host: 'localhost',
      port: '3306',
      username: 'root',
      password: '00005252',
      database: 'angular'
    };
    config = Object.assign(new DatabaseConfig(), config);

    await component.setConfig(config);

    expect(component.loadingFinished).toBe(true);
    expect(config).toEqual(component.config);
  });

  it('should show toastr Message', async () => {
    const config: DatabaseConfig = {
      host: 'localhost',
      port: '3306',
      username: 'root',
      password: '00005252',
      database: 'angular'
    };

    await component.setConfig(config);
    await component.saveConfig();

    await expect(toastr.info).toHaveBeenCalled();
  });
});
