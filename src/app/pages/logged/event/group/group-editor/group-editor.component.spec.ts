/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { Group } from '@entity/group/group.entity';
import { GroupEditorComponent } from './group-editor.component';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxElectronModule } from 'ngx-electron';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('GroupEditorComponent', () => {
  let component: GroupEditorComponent;
  let fixture: ComponentFixture<GroupEditorComponent>;
  let toastr: ToastrService;
  let ipc: IpcRendererService;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [GroupEditorComponent],
      imports: [
        NgxElectronModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        RouterTestingModule.withRoutes([
          {
            path: 'logged/event/group/editor/0/:id',
            component: GroupEditorComponent
          }
        ]),
        BrowserAnimationsModule
      ],
      providers: [
        IpcRendererService,
        ToastrService
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
      .compileComponents();
    toastr = TestBed.get(ToastrService);
    ipc = TestBed.get(IpcRendererService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(toastr, 'info');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save the content', async (done) => {
    component.form_group = Object.assign(new Group(), {
      id: 0,
      name: 'Jasmine Group',
      capacity: 30,
      event: { id: 1 }, classroom: { id: null }, comments: [], members: []
    });

    component.readyToSave = true;
    await component.save();

    setTimeout(async () => {
      try {
        expect(toastr.info).toHaveBeenCalled();
        done();
      } catch (e) {
        console.log(e);
      }
    }, 300);

  });

  it('should\'nt save the content', async () => {
    component.readyToSave = false;
    component.save();
    expect(toastr.info).not.toHaveBeenCalled();
  });

  it('should\'nt reassign blank group', () => {
    const oldVal = component.form_group;
    component.reassignGroup(new Group());
    expect(component.form_group).toEqual(oldVal);
  });
});
