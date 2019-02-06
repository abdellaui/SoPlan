/* tslint:disable:no-unused-variable */
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, resetFakeAsyncZone } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { NgxElectronModule } from 'ngx-electron';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { SchoolEditorComponent } from './school-editor.component';
import { I18n } from '@models/translation/i18n.class';

describe('SchoolEditorComponent', () => {
  let component: SchoolEditorComponent;
  let fixture: ComponentFixture<SchoolEditorComponent>;
  let toastr: ToastrService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolEditorComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
        ToastrModule.forRoot(),
        NgxElectronModule,
        HttpClientModule
      ],
      providers: [
        IpcRendererService,
        ToastrService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolEditorComponent);
    component = fixture.componentInstance;
    toastr = TestBed.get(ToastrService);
    fixture.detectChanges();

    spyOn(toastr, 'error');
    spyOn(toastr, 'info');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // should'nt save the content
  it('should\'nt save the content', async (done) => {
    component.readyToSave = true;
    await component.save();
    setTimeout(async () => {
      try {
        await expect(toastr.error).toHaveBeenCalled();

        done();
      } catch (e) {
        console.log(e);
      }

    }, 100);
  });
});
