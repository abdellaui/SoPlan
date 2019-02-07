/* tslint:disable:no-unused-variable */
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
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
import { I18n } from '@models/translation/i18n.class';
import { Ng2SmartTableComponent } from 'ng2-smart-table/ng2-smart-table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let toastr: ToastrService;
  let tableEl: HTMLElement;
  let tableDe: DebugElement;
  const st_config: SmartTableConfig = {
    settings: {
      header: I18n.resolve('school_list'),
      showCreateButton: true,
      createButtonText: I18n.resolve('school_new_school')
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
    toastr = TestBed.get(ToastrService);
    component.config = st_config;
    fixture.detectChanges();
    tableDe = fixture.debugElement;
    tableEl = tableDe.nativeElement;
    spyOn(toastr, 'error');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select row', () => {
    component.table = <Ng2SmartTableComponent>{ isAllSelected: false };
    const testObject = Object.assign({}, new Comment());
    component.onSelectRow({ selected: testObject });
    expect(component.selectedData).toEqual(testObject);
  });

  it('should show delete error', () => {
    component.rememberIdOfDeleteError = [6];
    component.showDeleteErrorToastr();
    expect(toastr.error).toHaveBeenCalled();
  });

  it('should save the new content', async (done) => {
    let school = new School();
    school.name = 'Jasmine School';
    school = Object.assign(school, {
      location:
      {
        street: 'Jasminestreet',
        subThoroughfare: '12345',
        postalcode: '12345',
        city: 'Jasmine City'
      }
    });
    spyOn(toastr, 'info');
    await component.saveEntity(school);
    setTimeout(async () => {
      await expect(toastr.info).toHaveBeenCalled();
      done();
    }, 100);
  });
});
