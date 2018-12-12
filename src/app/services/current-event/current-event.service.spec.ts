/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CurrentEventService } from './current-event.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxElectronModule } from 'ngx-electron';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';

describe('Service: CurrentEvent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        NgxElectronModule
      ],
      providers: [
        CurrentEventService,
        IpcRendererService
      ]
    });
  });

  it('should ...', inject([CurrentEventService], (service: CurrentEventService) => {
    expect(service).toBeTruthy();
  }));
});
