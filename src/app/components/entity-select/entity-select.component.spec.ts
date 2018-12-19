/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { EntitySelectOption, EntitySelectSettings } from '@models/componentInput.class';

import { EntitySelectComponent } from './entity-select.component';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { FormsModule } from '@angular/forms';
import { NgxElectronModule } from 'ngx-electron';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

describe('EntitySelectComponent', () => {
  let component: EntitySelectComponent;
  let fixture: ComponentFixture<EntitySelectComponent>;
  let settings: EntitySelectSettings;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EntitySelectComponent],
      imports: [
        FormsModule,
        NgxElectronModule,
        HttpClientModule,
        ToastrModule.forRoot()
      ],
      providers: [IpcRendererService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntitySelectComponent);
    component = fixture.componentInstance;

    settings = {
      getUrl: '',
      listNameMembers: ['']
    };
    component.selectedIds = [];
    component.settings = settings;
    component.hasError = false;
    component.readonly = false;

    fixture.detectChanges();

  });

  it('should create', () => {
    // TODO: sinnvolle Inputwerte zuweisen
    expect(component).toBeTruthy();
  });

  // TODO: should select element
  it('should select element', () => {
    expect(true).toBe(true);
  });

  // TODO: should extract information
  it('should extract information', () => {
    expect(true).toBe(true);
  });

  // TODO: should transfer to listitem
  it('should transfer to listitem', () => {
    expect(true).toBe(true);
  });

  // TODO: should get the elements from backend
  it('should get the elemetns from backend', () => {
    expect(true).toBe(true);
  });
});
