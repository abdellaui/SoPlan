/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PersonListeComponent } from './person-liste.component';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { CurrentEventService } from '@services/current-event/current-event.service';
import { ToastrService } from 'ngx-toastr';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';

describe('PersonListeComponent', () => {
  let component: PersonListeComponent;
  let fixture: ComponentFixture<PersonListeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonListeComponent],
      providers: [
        IpcRendererService,
        CurrentEventService,
        ToastrService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
