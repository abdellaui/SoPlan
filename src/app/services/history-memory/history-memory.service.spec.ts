/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HistoryMemoryService } from './history-memory.service';

describe('Service: HistoryMemory', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HistoryMemoryService]
    });
  });

  it('should ...', inject([HistoryMemoryService], (service: HistoryMemoryService) => {
    expect(service).toBeTruthy();
  }));
});
