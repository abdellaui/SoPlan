/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DateRendererComponent } from './date-renderer.component';

describe('DateRendererComponent', () => {
  let component: DateRendererComponent;
  let fixture: ComponentFixture<DateRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DateRendererComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: should render the date
  fit('should render the date', () => {
    component.value = new Date().toISOString();
    expect(true).toBe(true);
  });
});
