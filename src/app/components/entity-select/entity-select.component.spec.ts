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
    expect(component).toBeTruthy();
  });

  it('should select element', () => {
    component.selectSelectedIds();
    expect(component.initialized).toBe(true);
  });

  it('should extract information', () => {
    const info = component.extractInformation(
      { name: 'jasmine', age: 2, ignore: true },
      ['name', 'age']
    );
    expect(info).toEqual(['jasmine', 2]);
  });

  it('should get index of ID', () => {
    const checkIndex = component.getIndexOfId({ doesnot: 'exists' });
    expect(checkIndex).toEqual(-1);
  });

  it('should contains Id', () => {
    const exists = component.containsId(1);
    expect(exists).toEqual(false);
  });
});
