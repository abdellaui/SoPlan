/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TextareaComponent } from './textarea.component';
import { TextArea } from '@models/formBuilder.class';

describe('TextareaComponent', () => {
  let component: TextareaComponent;
  let fixture: ComponentFixture<TextareaComponent>;
  let textArea: TextArea;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TextareaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    textArea = new TextArea(false);
    component.element = textArea;
    component.value = 'TestBed Test Value';
    component.error = false;
    expect(component).toBeTruthy();
  });
});
