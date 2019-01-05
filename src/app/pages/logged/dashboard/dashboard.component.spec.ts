/* tslint:disable:no-unused-variable */
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NbCalendarRangeModule, NbCardModule, NbSpinnerModule } from '@nebular/theme';
import { CurrentEventService } from '@services/current-event/current-event.service';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { ChartsModule } from 'ng2-charts';
import { ElectronService, NgxElectronModule } from 'ngx-electron';

import { DashboardComponent } from './dashboard.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [
        NgxElectronModule,
        HttpClientModule,
        NbCardModule,
        NbCalendarRangeModule,
        ChartsModule,
        NbSpinnerModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        IpcRendererService,
        CurrentEventService,
        ElectronService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show help', () => {
    component.setEvent(null);
    expect(component.showHelp).toBe(true);
  });
});
