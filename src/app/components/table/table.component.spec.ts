/* tslint:disable:no-unused-variable */
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LocationSchema } from '@entity/_location/location.entity';
import { School, SchoolSchema } from '@entity/school/school.entity';
import { SmartTableConfig } from '@models/componentInput.class';
import { NbActionsModule, NbButtonModule, NbSpinnerModule } from '@nebular/theme';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxElectronModule } from 'ngx-electron';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  const st_config: SmartTableConfig = {
    settings: {
      header: 'Schulliste',
      showCreateButton: true,
      createButtonText: 'Neue Schule'
    },
    slotUrls: {
      getUrl: 'get/school/all',
      postUrl: 'post/school',
      deleteUrl: 'delete/school',
      editorUrl: '/logged/school/editor/'
    },
    instanceMap: {
      '': School.prototype,
      'location': Location.prototype,
    },
    memberList: [
      {
        prefix: '',
        schema: SchoolSchema,
        members: [
          'name',
        ]
      },
      {
        prefix: 'location@',
        schema: LocationSchema,
        members: ['street', 'subThoroughfare', 'postalcode', 'city']
      }
    ]
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
        NgxElectronModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        FormsModule,
        NbSpinnerModule,
        Ng2SmartTableModule,
        NbButtonModule,
        NbActionsModule,
      ],
      providers: [
        IpcRendererService,
        ToastrService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;

    component.config = st_config;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: should show delete error
  it('should show delete error', () => {
    expect(true).toBe(true);
  });

  // TODO: should save the new content
  it('should save the new content', () => {
    expect(true).toBe(true);
  });

  // TODO: should delete selected entity
  it('should delete selected entity', () => {
    expect(true).toBe(true);
  });

  // TODO: should warn the user with delete confirm
  it('should warn the user with delete confirm', () => {
    expect(true).toBe(true);
  });
});
