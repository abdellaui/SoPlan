/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GroupListeComponent } from './group-liste.component';

describe('GroupListeComponent', () => {
  let component: GroupListeComponent;
  let fixture: ComponentFixture<GroupListeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupListeComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
