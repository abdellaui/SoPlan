/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { VenueEditorComponent } from './venue-editor.component';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxElectronModule } from 'ngx-electron';
import { HttpClientModule } from '@angular/common/http';

describe('VenueEditorComponent', () => {
  let component: VenueEditorComponent;
  let fixture: ComponentFixture<VenueEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VenueEditorComponent],
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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
