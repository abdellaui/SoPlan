/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { EntitySelectOption, EntitySelectSettings } from '@models/componentInput.class';

import { EntitySelectComponent } from './entity-select.component';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';

describe('EntitySelectComponent', () => {
  let component: EntitySelectComponent;
  let fixture: ComponentFixture<EntitySelectComponent>;
  let settings: EntitySelectSettings;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EntitySelectComponent],
      providers: [IpcRendererService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntitySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // TODO: richtige Settings angeben zum testen
    settings = {
      getUrl: '',
      listNameMembers: ['']
    };
  });

  it('should create', () => {
    // TODO: sinnvolle Inputwerte zuweisen
    component.selectedIds = [1];
    component.settings = settings;
    component.hasError = false;
    component.readonly = false;
    expect(component).toBeTruthy();
  });
});
