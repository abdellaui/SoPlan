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

  // TODO: should save entity
  it('should save entity', () => {
    expect(true).toBe(true);
  });

  // TODO: should check finished
  it('should check finished', () => {
    expect(true).toBe(true);
  });

  // TODO: should delete all selected
  it('should delete all selected', () => {
    expect(true).toBe(true);
  });
});
