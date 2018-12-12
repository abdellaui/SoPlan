/* tslint:disable:no-unused-variable */
import { APP_BASE_HREF } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NbMenuModule, NbThemeModule } from '@nebular/theme';

import { SidemenuComponent } from './sidemenu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SidemenuComponent', () => {
  let component: SidemenuComponent;
  let fixture: ComponentFixture<SidemenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SidemenuComponent],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([]),
        NbThemeModule.forRoot({ name: 'default' }),
        NbMenuModule.forRoot()
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
