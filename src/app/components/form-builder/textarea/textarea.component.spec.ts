/* tslint:disable:no-unused-variable */
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TextArea } from '@models/formBuilder.class';
import { NbInputModule, NbPopoverModule } from '@nebular/theme';

import { TextareaComponent } from './textarea.component';

describe('TextareaComponent', () => {
  let component: TextareaComponent;
  let fixture: ComponentFixture<TextareaComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TextareaComponent],
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
    fixture = TestBed.createComponent(TextareaComponent);
    component = fixture.componentInstance;

    component.element = new TextArea(false);
    component.value = 'TestBed Test Value';
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
});
