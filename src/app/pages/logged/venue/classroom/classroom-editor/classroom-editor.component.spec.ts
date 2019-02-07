/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ClassroomEditorComponent } from './classroom-editor.component';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxElectronModule } from 'ngx-electron';
import { HttpClientModule } from '@angular/common/http';
import { Classroom } from '@entity/classroom/classroom.entity';

describe('ClassroomEditorComponent', () => {
  let component: ClassroomEditorComponent;
  let fixture: ComponentFixture<ClassroomEditorComponent>;
  let toastr: ToastrService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClassroomEditorComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes([]),
        NgxElectronModule,
        ToastrModule.forRoot()
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
    fixture = TestBed.createComponent(ClassroomEditorComponent);
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

  it('should\'nt reassign blank classroom', () => {
    const oldVal = component.form_classroom;
    component.reassignClassroom(new Classroom());
    expect(component.form_classroom).toEqual(oldVal);
  });
});
