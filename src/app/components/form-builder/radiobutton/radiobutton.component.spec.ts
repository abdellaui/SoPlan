/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RadiobuttonComponent } from './radiobutton.component';
import { RadioButton } from '@models/formBuilder.class';

describe('RadiobuttonComponent', () => {
  let component: RadiobuttonComponent;
  let fixture: ComponentFixture<RadiobuttonComponent>;
  let radioButton: RadioButton;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RadiobuttonComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadiobuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    radioButton = new RadioButton([{ label: 'TestBed Label', value: 'TestBed Value' }]);
    component.element = radioButton;
    component.value = 'Test Value';
    component.error = false;
    expect(component).toBeTruthy();
  });
});
