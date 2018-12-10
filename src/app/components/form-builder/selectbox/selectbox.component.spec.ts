/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SelectboxComponent } from './selectbox.component';
import { SelectBox } from '@models/formBuilder.class';

describe('SelectboxComponent', () => {
  let component: SelectboxComponent;
  let fixture: ComponentFixture<SelectboxComponent>;
  let selectBox: SelectBox;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectboxComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    selectBox = new SelectBox([{ label: 'Test Label', value: 'Test Value' }]);
    component.element = selectBox;
    component.value = 'Test Value';
    component.error = false;
    expect(component).toBeTruthy();
  });
});
