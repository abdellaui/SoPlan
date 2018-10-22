/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { EinstellungMailComponent } from './einstellung-mail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxElectronModule } from 'ngx-electron';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';

describe('EinstellungMailComponent', () => {
  let component: EinstellungMailComponent;
  let fixture: ComponentFixture<EinstellungMailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EinstellungMailComponent,
      ],
      imports: [
        RouterTestingModule.withRoutes([]),
        NgxElectronModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        FormsModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
      providers: [
        IpcRendererService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EinstellungMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
