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
import { Venue } from '@entity/venue/venue.entity';

describe('VenueEditorComponent', () => {
  let component: VenueEditorComponent;
  let fixture: ComponentFixture<VenueEditorComponent>;
  let toastr: ToastrService;

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

    toastr = TestBed.get(ToastrService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueEditorComponent);
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

  it('should\'nt reassign blank venue', () => {
    const oldVal = component.form_venue;
    component.reassignVenue(new Venue());
    expect(component.form_venue).toEqual(oldVal);
  });
});
