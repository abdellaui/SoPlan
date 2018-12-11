/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EntityCommentComponent } from './entity-comment.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxElectronModule } from 'ngx-electron';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { ToastrService } from 'ngx-toastr';
import { Person } from '@entity/person/person.entity';
import { Comment } from '@entity/comment/comment.entity';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


describe('EntityCommentComponent', () => {
  let component: EntityCommentComponent;
  let fixture: ComponentFixture<EntityCommentComponent>;
  let entity: any;
  let entityPostUrl: string;
  let comment: Comment;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    entity = new Person();
    entity.comments = [];
    entityPostUrl = 'post/person';
    console.log(entity);
    component.entity = entity;
    component.entityPostUrl = entityPostUrl;
    expect(component).toBeTruthy();
  });
});
