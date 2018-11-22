/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EventListeComponent } from './event-liste.component';

describe('EventListeComponent', () => {
  let component: EventListeComponent;
  let fixture: ComponentFixture<EventListeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventListeComponent ]
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
});
