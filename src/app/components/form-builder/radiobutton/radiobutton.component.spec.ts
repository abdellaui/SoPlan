/* tslint:disable:no-unused-variable */
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RadioButton } from '@models/formBuilder.class';
import { NB_DOCUMENT, NbPopoverModule, NbRadioModule } from '@nebular/theme';

import { RadiobuttonComponent } from './radiobutton.component';

describe('RadiobuttonComponent', () => {
  let component: RadiobuttonComponent;
  let fixture: ComponentFixture<RadiobuttonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RadiobuttonComponent],
      imports: [
        FormsModule,
        NbPopoverModule,
        NbRadioModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: NB_DOCUMENT, useValue: document }],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadiobuttonComponent);
    component = fixture.componentInstance;


    component.element = new RadioButton([new Option('test')]);
    component.value = 'Test Value';
    component.error = false;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
