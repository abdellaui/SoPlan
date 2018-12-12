/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { VeranstaltungenComponent } from './veranstaltungen.component';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { NgxElectronModule } from 'ngx-electron';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('VeranstaltungenComponent', () => {
  let component: VeranstaltungenComponent;
  let fixture: ComponentFixture<VeranstaltungenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VeranstaltungenComponent],
      imports: [
        HttpClientModule,
        NgxElectronModule,
        ToastrModule.forRoot(),
        FormsModule
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
    fixture = TestBed.createComponent(VeranstaltungenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
