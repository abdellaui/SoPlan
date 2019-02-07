/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ParticipantEditorComponent } from './participant-editor.component';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxElectronModule } from 'ngx-electron';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Participant } from '@entity/participant/participant.entity';

describe('ParticipantEditorComponent', () => {
  let component: ParticipantEditorComponent;
  let fixture: ComponentFixture<ParticipantEditorComponent>;
  let toastr: ToastrService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ParticipantEditorComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes([]),
        NgxElectronModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule
      ],
      providers: [
        IpcRendererService,
        ToastrService
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
      .compileComponents();

    toastr = TestBed.get(ToastrService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(toastr, 'info');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should\'nt save the content', async () => {
    component.readyToSave = false;
    component.save();
    expect(toastr.info).not.toHaveBeenCalled();
  });

  it('should\'nt reassign blank participant', () => {
    const oldVal = component.form_participant;
    component.reassignParticipant(new Participant());
    expect(component.form_participant).toEqual(oldVal);
  });

});
