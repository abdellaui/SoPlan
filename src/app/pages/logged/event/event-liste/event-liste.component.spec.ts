/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EventListeComponent } from './event-liste.component';
import { CurrentEventService } from '@services/current-event/current-event.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ElectronService, NgxElectronModule } from 'ngx-electron';
import { HttpClientModule } from '@angular/common/http';

describe('EventListeComponent', () => {
  let component: EventListeComponent;
  let fixture: ComponentFixture<EventListeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventListeComponent],
      imports: [
        HttpClientModule,
      ],
      providers: [
        CurrentEventService,
        ElectronService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: should create the table
  it('should create the table', () => {
    expect(true).toBe(true);
  });
});
