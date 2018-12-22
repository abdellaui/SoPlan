/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PugSelectComponent } from './pug-select.component';

describe('PugSelectComponent', () => {
  let component: PugSelectComponent;
  let fixture: ComponentFixture<PugSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PugSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PugSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
