/* tslint:disable:no-unused-variable */
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NbCalendarRangeModule, NbCardModule, NbSpinnerModule } from '@nebular/theme';
import { CurrentEventService } from '@services/current-event/current-event.service';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { ChartsModule } from 'ng2-charts';
import { ElectronService, NgxElectronModule } from 'ngx-electron';

import { DashboardComponent } from './dashboard.component';

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
        NbSpinnerModule
      ],
      providers: [
        IpcRendererService,
        CurrentEventService,
        ElectronService
      ]
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

  // TODO: should get statistics for charts
  it('should get statistics for charts', () => {
    expect(true).toBe(true);
  })
});
