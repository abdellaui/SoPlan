/* tslint:disable:no-unused-variable */
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { NgxElectronModule } from 'ngx-electron';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { SchoolEditorComponent } from './school-editor.component';

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
