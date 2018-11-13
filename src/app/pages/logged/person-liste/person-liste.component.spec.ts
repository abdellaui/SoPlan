/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PersonListeComponent } from './person-liste.component';

describe('PersonListeComponent', () => {
  let component: PersonListeComponent;
  let fixture: ComponentFixture<PersonListeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonListeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
