/* tslint:disable:no-unused-variable */
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { NgxElectronModule } from 'ngx-electron';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { EntityCommentComponent } from './entity-comment.component';


describe('EntityCommentComponent', () => {
  let component: EntityCommentComponent;
  let fixture: ComponentFixture<EntityCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EntityCommentComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
        NgxElectronModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        FormsModule
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
    fixture = TestBed.createComponent(EntityCommentComponent);
    component = fixture.componentInstance;

    component.entity = { comments: [] };
    component.entityPostUrl = 'post/person';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should\'nt show the CommentComponent', () => {
    component.entityPostUrl = '';
    component.entity = false;
    expect(component.getShow()).toBeFalsy();
  });

  it('should check finished', () => {
    component.checkFinished(true);
    expect(component.commentIsAccaptable).toBe(true);
  });

  it('should select row', () => {
    const testObject = Object.assign({}, new Comment());
    component.onSelectRow({ selected: testObject });
    expect(component.selectedData).toEqual(testObject);
  });
});
