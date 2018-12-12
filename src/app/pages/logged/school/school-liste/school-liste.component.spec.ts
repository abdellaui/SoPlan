/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SchoolListeComponent } from './school-liste.component';

describe('SchoolListeComponent', () => {
  let component: SchoolListeComponent;
  let fixture: ComponentFixture<SchoolListeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolListeComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
