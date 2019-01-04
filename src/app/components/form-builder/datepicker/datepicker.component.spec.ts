/* tslint:disable:no-unused-variable */
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { DatePicker } from '@models/formBuilder.class';
import {
  NB_DOCUMENT,
  NbDatepickerModule,
  NbInputModule,
  NbLayoutModule,
  NbPopoverModule,
  NbThemeModule,
} from '@nebular/theme';
import { NbOverlayContainerAdapter } from '@nebular/theme/components/cdk';

import { DatepickerComponent } from './datepicker.component';

describe('DatepickerComponent', () => {
  let component: DatepickerComponent;
  let fixture: ComponentFixture<DatepickerComponent>;
  let overlayContainerService: NbOverlayContainerAdapter;
  let overlayContainer: HTMLElement;
  let document: Document;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DatepickerComponent],
      imports: [
        FormsModule,
        NbPopoverModule,
        NbInputModule,
        RouterTestingModule.withRoutes([]),
        NbThemeModule.forRoot(),
        NbLayoutModule,
        NbDatepickerModule.forRoot(),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerComponent);

    overlayContainerService = TestBed.get(NbOverlayContainerAdapter);
    document = TestBed.get(NB_DOCUMENT);
    overlayContainer = document.createElement('div');
    overlayContainerService.setContainer(overlayContainer);

    component = fixture.componentInstance;
    component.element = new DatePicker();
    component.value = new Date().toString();
    component.error = false;

    fixture.detectChanges();
  });

  afterEach(() => {
    overlayContainerService.clearContainer();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should transfer empty string to null', () => {
    component.shownValue = '';
    component.outputToType();
    expect(component.shownValue).toBeNull();
  });

  it('should transfer ISODateString to Date', () => {
    const actDate = new Date();
    component.shownValue = actDate.toISOString();
    component.outputToType();
    expect(component.shownValue).toEqual(actDate);
  });

  it('shouldnt transfer wrong ISODateString to Date', () => {
    const actDate = new Date();
    component.shownValue = new Date(actDate.getTime() + 100).toISOString();
    component.outputToType();
    expect(component.shownValue).not.toEqual(actDate);
  });

  it('should set value on DateSelectEvent', () => {
    const actDate = new Date();
    component.onDateSelect(actDate);
    expect(component.shownValue).toEqual(actDate);
  });
});
