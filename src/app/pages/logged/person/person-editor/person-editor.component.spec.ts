/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PersonEditorComponent } from './person-editor.component';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxElectronModule } from 'ngx-electron';
import { HttpClientModule } from '@angular/common/http';
import { Person } from '@entity/person/person.entity';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PersonEditorComponent', () => {
  let component: PersonEditorComponent;
  let fixture: ComponentFixture<PersonEditorComponent>;
  let toastr: ToastrService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonEditorComponent],
      imports: [
        HttpClientModule,
        ToastrModule.forRoot(),
        NgxElectronModule,
        RouterTestingModule.withRoutes([]),
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
    fixture = TestBed.createComponent(PersonEditorComponent);
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

  it('should\'nt reassign blank participant', () => {
    const oldVal = component.form_person;
    component.reassignPerson(new Person());
    expect(component.form_person).toEqual(oldVal);
  });
});
