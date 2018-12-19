/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SchoolEditorComponent } from './school-editor.component';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxElectronModule } from 'ngx-electron';
import { HttpClientModule } from '@angular/common/http';

describe('SchoolEditorComponent', () => {
  let component: SchoolEditorComponent;
  let fixture: ComponentFixture<SchoolEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolEditorComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
        ToastrModule.forRoot(),
        NgxElectronModule,
        HttpClientModule
      ],
      providers: [
        IpcRendererService,
        ToastrService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: should save the content
  it('should save the content', () => {
    expect(true).toBe(true);
  });
});
