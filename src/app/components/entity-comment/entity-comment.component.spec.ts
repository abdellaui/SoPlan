/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EntityCommentComponent } from './entity-comment.component';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilderSettings } from '@models/componentInput.class';
import { DateRendererComponent } from '@components/table/date-renderer/date-renderer.component';


describe('EntityCommentComponent', () => {
  let component: EntityCommentComponent;
  let fixture: ComponentFixture<EntityCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EntityCommentComponent],
      imports: [DateRendererComponent],
      providers: [
        IpcRendererService,
        ToastrService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
