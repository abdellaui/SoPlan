import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { DatabaseConfig } from '@models/configs.class';
import { NgxElectronModule } from 'ngx-electron';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { IpcRendererService } from '../../services/ipc-renderer/ipc-renderer.service';
import { EinstellungDatenbankComponent } from './einstellung-datenbank.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('EinstellungenDatenbankComponent', () => {
  let component: EinstellungDatenbankComponent;
  let fixture: ComponentFixture<EinstellungDatenbankComponent>;
  let ipc: IpcRendererService;
  let toastr: ToastrService;
  let oldConfig: any;
  const config: DatabaseConfig = {
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: '00005252',
    database: 'angular'
  };
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        EinstellungDatenbankComponent
      ],
      imports: [
        NgxElectronModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        RouterTestingModule.withRoutes([]),
        FormsModule,
        BrowserAnimationsModule
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

    try {
      oldConfig = await ipc.get<DatabaseConfig>('get/database/config');
    } catch (e) {
      console.log(e);
      return false;
    }
  });

  afterAll(async () => {
    try {
      component.setConfig(oldConfig);
      await component.saveConfig();
    } catch (e) {
      console.log(e);
      return false;
    }
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EinstellungDatenbankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(toastr, 'info');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save config', async (done) => {
    component.setConfig(config);

    component.saveConfig();
    setTimeout(async () => {
      try {
        const expectConfig: DatabaseConfig = await ipc.get<DatabaseConfig>('get/database/config');

        expect(JSON.stringify(config)).toEqual(JSON.stringify(expectConfig));
        done();
      } catch (e) {
        console.log(e);
      }

    }, 100);
  });

  it('should set config', async () => {
    component.setConfig(config);

    expect(component.loadingFinished).toBe(true);
    expect(JSON.stringify(config)).toEqual(JSON.stringify(component.config));
  });

  it('should show toastr Message', async () => {

    await component.setConfig(config);
    await component.saveConfig();

    await expect(toastr.info).toHaveBeenCalled();
  });
});
