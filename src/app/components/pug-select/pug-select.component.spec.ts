/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PugSelectComponent } from './pug-select.component';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { FormsModule } from '@angular/forms';
import { NgxElectronModule } from 'ngx-electron';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

describe('PugSelectComponent', () => {
  let component: PugSelectComponent;
  let fixture: ComponentFixture<PugSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PugSelectComponent],
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
    fixture = TestBed.createComponent(PugSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
