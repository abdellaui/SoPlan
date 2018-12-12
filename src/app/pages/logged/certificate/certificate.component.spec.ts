import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NB_DOCUMENT, NbInputModule, NbSelectModule, NbStepperModule, NbThemeModule } from '@nebular/theme';
import { NbOverlayContainerAdapter } from '@nebular/theme/components/cdk';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { ElectronService, NgxElectronModule } from 'ngx-electron';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { CertificateComponent } from './certificate.component';

describe('CertificateComponent', () => {
  let component: CertificateComponent;
  let fixture: ComponentFixture<CertificateComponent>;
  let overlayContainerService: NbOverlayContainerAdapter;
  let overlayContainer: HTMLElement;
  let document: Document;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CertificateComponent
      ],
      imports: [
        RouterTestingModule.withRoutes([]),
        NgxElectronModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        NbStepperModule,
        NbSelectModule,
        NbThemeModule.forRoot(),
        NbInputModule
      ],
      providers: [
        IpcRendererService,
        ToastrService,
        ElectronService,
        FormBuilder,
        {
          provide: NG_VALUE_ACCESSOR,
          multi: true,
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificateComponent);

    overlayContainerService = TestBed.get(NbOverlayContainerAdapter);
    document = TestBed.get(NB_DOCUMENT);
    overlayContainer = document.createElement('div');
    overlayContainerService.setContainer(overlayContainer);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    overlayContainerService.clearContainer();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
