/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { VenueListeComponent } from './venue-liste.component';

describe('VenueListeComponent', () => {
  let component: VenueListeComponent;
  let fixture: ComponentFixture<VenueListeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VenueListeComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
