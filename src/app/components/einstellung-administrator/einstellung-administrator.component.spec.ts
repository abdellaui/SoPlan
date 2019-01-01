/* tslint:disable:no-unused-variable */
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationGuard } from '@guards/authentication/authentication.guard';
import { NgxElectronModule } from 'ngx-electron';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { IpcRendererService } from '../../services/ipc-renderer/ipc-renderer.service';
import { EinstellungAdministratorComponent } from './einstellung-administrator.component';

describe('EinstellungAdministratorComponent', () => {
  let component: EinstellungAdministratorComponent;
  let fixture: ComponentFixture<EinstellungAdministratorComponent>;
  let ipc: IpcRendererService;
  let toastr: ToastrService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EinstellungAdministratorComponent,
      ],
      imports: [
        RouterTestingModule.withRoutes([]),
        NgxElectronModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        FormsModule,
        BrowserAnimationsModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
      providers: [
        IpcRendererService,
        ToastrService,
        AuthenticationGuard
      ]
    })
      .compileComponents();

    ipc = TestBed.get(IpcRendererService);
    toastr = TestBed.get(ToastrService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EinstellungAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(toastr, 'error');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // btoa -> encode String to base64
  // atob -> decode base64 to string
  fit('should save config', async () => {
    const newUsername = 'admin';
    const newPassword = 'testpw';
    let newConfig: { username: string, password: string };

    await ipc.get('get/administrator').then(async (result: { username: string, password: string }) => {
      component.setConfig({ username: result.username, password: result.password });

      component.username = newUsername;
      component.password = window.atob(result.password);
      component.newpsw = newPassword;
      component.newpsw2 = newPassword;

      await component.saveConfig();

      await ipc.get('get/administrator').then((res: { username: string, password: string }) => {
        newConfig = res;
      });
    });

    await expect(newConfig).toEqual({ password: window.btoa(newPassword), username: newUsername });
  });

  fit('should check the password', async () => {
    component.username = 'admin';
    component.password = 'wrongPassword';
    component.newpsw = 'newPassword';
    component.newpsw2 = 'newPassword';

    await component.saveConfig();

    await expect(toastr.error).toHaveBeenCalled();
  });

  // TODO: should give response with toastr
  fit('should give response with toastr', async () => {
    await ipc.get('get/administrator').then(async (result: { username: string, password: string }) => {
      component.username = result.username;
      component.password = window.atob(result.password);
      component.newpsw = 'newPassword';
      component.newpsw2 = 'anotherPassword';

      await component.saveConfig();
    });

    await expect(toastr.error).toHaveBeenCalledWith('Passwörter stimmen nicht überein!');
  });

});
