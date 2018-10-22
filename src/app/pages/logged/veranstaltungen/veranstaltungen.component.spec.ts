/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VeranstaltungenComponent } from './veranstaltungen.component';

describe('VeranstaltungenComponent', () => {
  let component: VeranstaltungenComponent;
  let fixture: ComponentFixture<VeranstaltungenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VeranstaltungenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeranstaltungenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
