/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BedroomEditorComponent } from './bedroom-editor.component';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxElectronModule } from 'ngx-electron';
import { HttpClientModule } from '@angular/common/http';
import { Bedroom } from '@entity/bedroom/bedroom.entity';

describe('BedroomEditorComponent', () => {
  let component: BedroomEditorComponent;
  let fixture: ComponentFixture<BedroomEditorComponent>;
  let toastr: ToastrService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BedroomEditorComponent],
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
    fixture = TestBed.createComponent(BedroomEditorComponent);
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

  it('should\'nt reassign blank bedroom', () => {
    const oldVal = component.form_bedroom;
    component.reassignBedroom(new Bedroom());
    expect(component.form_bedroom).toEqual(oldVal);
  });
});
