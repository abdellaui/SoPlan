/* tslint:disable:no-unused-variable */
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import {
  NB_DOCUMENT,
  NbDatepickerModule,
  NbInputModule,
  NbLayoutModule,
  NbPopoverModule,
  NbThemeModule,
} from '@nebular/theme';
import { NbOverlayContainerAdapter } from '@nebular/theme/components/cdk';
import { Cell } from 'ng2-smart-table';
import { Column } from 'ng2-smart-table/lib/data-set/column';
import { DataSet } from 'ng2-smart-table/lib/data-set/data-set';
import { Row } from 'ng2-smart-table/lib/data-set/row';

import { DateEditorComponent } from './date-editor.component';

describe('DateEditorComponent', () => {
  let component: DateEditorComponent;
  let fixture: ComponentFixture<DateEditorComponent>;
  let overlayContainerService: NbOverlayContainerAdapter;
  let overlayContainer: HTMLElement;
  let document: Document;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DateEditorComponent],
      imports: [
        FormsModule,
        NbPopoverModule,
        NbInputModule,
        RouterTestingModule.withRoutes([]),
        NbThemeModule.forRoot(),
        NbLayoutModule,
        NbDateFnsDateModule,
        NbDatepickerModule.forRoot(),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(DateEditorComponent);

    overlayContainerService = TestBed.get(NbOverlayContainerAdapter);
    document = TestBed.get(NB_DOCUMENT);
    overlayContainer = document.createElement('div');
    overlayContainerService.setContainer(overlayContainer);

    component = fixture.componentInstance;

    const dataset = new DataSet([], {});
    component.cell = new Cell(new Date().toISOString(), new Row(0, 0, dataset), new Column('', {}, dataset), dataset);
    // keine ahnung
    fixture.detectChanges();
  });

  afterEach(() => {
    overlayContainerService.clearContainer();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should transfer empty string to null', () => {
    component.value = '';
    component.outputToType();
    expect(component.value).toBeNull();
  });

  it('should transfer ISODateString to Date', () => {
    const actDate = new Date();
    component.value = actDate.toISOString();
    component.outputToType();
    expect(component.value).toEqual(actDate);
  });

  it('shouldnt transfer wrong ISODateString to Date', () => {
    const actDate = new Date();
    component.value = new Date(actDate.getTime() + 100).toISOString();
    component.outputToType();
    expect(component.value).not.toEqual(actDate);
  });

  it('should set value on DateSelectEvent', () => {
    const actDate = new Date();
    component.onDateSelect(actDate);
    expect(component.value).toEqual(actDate);
  });
});
