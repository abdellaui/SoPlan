/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IpcRendererService } from './ipcRenderer.service';
import { ElectronService, NgxElectronModule } from 'ngx-electron';
import { HttpClientModule } from '@angular/common/http';

describe('Service: IpcRenderer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IpcRendererService],
      imports: [NgxElectronModule, HttpClientModule]
    });
  });

  it('should ...', inject([IpcRendererService, ElectronService], (service: IpcRendererService) => {
    expect(service).toBeTruthy();
  }));
});
