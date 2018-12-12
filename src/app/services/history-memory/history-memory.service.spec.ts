/* tslint:disable:no-unused-variable */
import { APP_BASE_HREF } from '@angular/common';
import { inject, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { HistoryMemoryService } from './history-memory.service';


describe('Service: HistoryMemory', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([])
      ],
      providers: [
        HistoryMemoryService,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    });
  });

  it('should ...', inject([HistoryMemoryService], (service: HistoryMemoryService) => {
    expect(service).toBeTruthy();
  }));
});
