/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CurrentEventService } from './current-event.service';

describe('Service: CurrentEvent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrentEventService]
    });
  });

  it('should ...', inject([CurrentEventService], (service: CurrentEventService) => {
    expect(service).toBeTruthy();
  }));
});
