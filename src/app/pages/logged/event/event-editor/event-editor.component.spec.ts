/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Event } from '@entity/event/event.entity';
import { EventEditorComponent } from './event-editor.component';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { CurrentEventService } from '@services/current-event/current-event.service';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxElectronModule } from 'ngx-electron';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('EventEditorComponent', () => {
  let component: EventEditorComponent;
  let fixture: ComponentFixture<EventEditorComponent>;
  let toastr: ToastrService;
  let ipc: IpcRendererService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventEditorComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
        NgxElectronModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule
      ],
      providers: [
        IpcRendererService,
        CurrentEventService,
        ToastrService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();

    ipc = TestBed.get(IpcRendererService);
    toastr = TestBed.get(ToastrService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(toastr, 'info');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should\'nt save the content', () => {
    component.readyToSave = false;
    component.save();
    expect(toastr.info).not.toHaveBeenCalled();
  });

  it('should\'nt reassign blank event', () => {
    const oldVal = component.form_event;
    component.reassignEvent(new Event());
    expect(component.form_event).toEqual(oldVal);
  });
});
