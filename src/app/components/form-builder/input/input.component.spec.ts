/* tslint:disable:no-unused-variable */
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Input } from '@models/formBuilder.class';
import { NbInputModule, NbPopoverModule } from '@nebular/theme';

import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputComponent],
      imports: [
        FormsModule,
        NbPopoverModule,
        NbInputModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;

    component.element = new Input();
    component.value = 'test';
    component.error = false;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should transfer empty value to null', () => {
    component.value = '';
    component.outputToType();
    expect(component.value).toBeNull();
  });

  it('should transfer value to Number', () => {
    component.element = new Input('number');
    component.value = '123';
    component.outputToType();
    expect(component.value).toEqual(123);
  });

  it('should transfer value to String', () => {
    component.element = new Input();
    component.value = '123';
    component.outputToType();
    expect(component.value).toEqual('123');
  });
});
