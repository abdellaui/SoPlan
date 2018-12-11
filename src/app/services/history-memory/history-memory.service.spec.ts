/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HistoryMemoryService } from './history-memory.service';
import { RouterModule } from '@angular/router';

describe('Service: HistoryMemory', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([])
      ],
      providers: [HistoryMemoryService]
    });
  });

  it('should ...', inject([HistoryMemoryService], (service: HistoryMemoryService) => {
    expect(service).toBeTruthy();
  }));
});
