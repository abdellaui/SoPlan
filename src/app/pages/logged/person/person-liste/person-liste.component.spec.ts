/* tslint:disable:no-unused-variable */
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CurrentEventService } from '@services/current-event/current-event.service';
import { HistoryMemoryService } from '@services/history-memory/history-memory.service';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { NgxElectronModule } from 'ngx-electron';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { PersonListeComponent } from './person-liste.component';

describe('PersonListeComponent', () => {
  let component: PersonListeComponent;
  let fixture: ComponentFixture<PersonListeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonListeComponent],
      imports: [
        NgxElectronModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        IpcRendererService,
        CurrentEventService,
        ToastrService,
        HistoryMemoryService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
