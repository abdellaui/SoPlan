/* tslint:disable:no-unused-variable */
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Option, SelectBox } from '@models/formBuilder.class';
import { NB_DOCUMENT, NbListModule, NbPopoverModule, NbSelectModule, NbThemeModule } from '@nebular/theme';
import { NbOverlayContainerAdapter } from '@nebular/theme/components/cdk';

import { SelectboxComponent } from './selectbox.component';

describe('SelectboxComponent', () => {
  let component: SelectboxComponent;
  let fixture: ComponentFixture<SelectboxComponent>;
  let overlayContainerService: NbOverlayContainerAdapter;
  let overlayContainer: HTMLElement;
  let document: Document;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectboxComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
        NbThemeModule.forRoot(),
        FormsModule,
        NbPopoverModule,
        NbSelectModule,
        NbListModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectboxComponent);
    overlayContainerService = TestBed.get(NbOverlayContainerAdapter);
    document = TestBed.get(NB_DOCUMENT);

    overlayContainer = document.createElement('div');
    overlayContainerService.setContainer(overlayContainer);

    component = fixture.componentInstance;

    component.element = new SelectBox([new Option('test')]);
    component.value = 'Test Value';
    component.error = false;

    fixture.detectChanges();
  });

  afterEach(() => {
    overlayContainerService.clearContainer();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
