/* tslint:disable:no-unused-variable */
import { APP_BASE_HREF } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NbMenuModule, NbThemeModule } from '@nebular/theme';

import { SidemenuComponent } from './sidemenu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { I18n } from '@models/translation/i18n.class';

describe('SidemenuComponent', () => {
  let component: SidemenuComponent;
  let fixture: ComponentFixture<SidemenuComponent>;
  let sideMenuDe: DebugElement;

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
    sideMenuDe = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have option to logout', () => {
    expect(sideMenuDe.queryAll(By.css('ul a')).pop().attributes.title).toEqual(I18n.resolve('menu_logout'));
  });

  it('should have the right order', () => {
    const listOfMenues = sideMenuDe.queryAll(By.css('nb-menu > ul > li > a'));

    expect(listOfMenues[listOfMenues.length - 1].attributes.title).toEqual(I18n.resolve('menu_logout'));
    expect(listOfMenues[listOfMenues.length - 2].attributes.title).toEqual(I18n.resolve('menu_settings'));
    expect(listOfMenues[listOfMenues.length - 3].attributes.title).toEqual(I18n.resolve('menu_event'));
    expect(listOfMenues[0].attributes.title).toEqual(I18n.resolve('menu_dashboard'));
  });
});
