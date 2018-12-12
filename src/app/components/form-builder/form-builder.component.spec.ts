/* tslint:disable:no-unused-variable */
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { School, SchoolSchema } from '@entity/school/school.entity';
import { FormBuilderSettings } from '@models/componentInput.class';
import { NbPopoverModule } from '@nebular/theme';

import { FormBuilderComponent } from './form-builder.component';

describe('FormBuilderComponent', () => {
  let component: FormBuilderComponent;
  let fixture: ComponentFixture<FormBuilderComponent>;
  let form_schoolInstance: School;
  const form_schoolSchema = SchoolSchema;
  const form_schoolSettings: FormBuilderSettings = <FormBuilderSettings>{
    header: 'Information',
    buttons: false
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormBuilderComponent],
      imports: [
        FormsModule,
        NbPopoverModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBuilderComponent);
    component = fixture.componentInstance;

    form_schoolInstance = new School();

    component.schema = form_schoolSchema;
    component.write = form_schoolInstance;
    component.settings = form_schoolSettings;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
