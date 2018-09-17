/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SidemenuComponent } from './sidemenu.component';
import { NbMenuModule, NbThemeModule } from '@nebular/theme';
import { RouterModule } from '@angular/router'
import { APP_BASE_HREF } from '@angular/common';

describe('SidemenuComponent', () => {
  let component: SidemenuComponent;
  let fixture: ComponentFixture<SidemenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SidemenuComponent],
      imports: [
        BrowserModule,
        RouterModule.forRoot([]),
        NbThemeModule.forRoot({ name: 'default' }),
        NbMenuModule.forRoot(),
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
