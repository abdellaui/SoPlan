/* tslint:disable:no-unused-variable */
import { HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { ElectronService, NgxElectronModule } from 'ngx-electron';

import { IpcRendererService } from './ipc-renderer.service';


describe('Service: IpcRenderer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IpcRendererService],
      imports: [NgxElectronModule, HttpClientModule]
    });
  });

  it('should provide service', inject([IpcRendererService, ElectronService], (service: IpcRendererService) => {
    expect(service).toBeTruthy();
  }));
});
