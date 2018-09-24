import * as Settings from 'electron-settings';

import { AdminLogin } from '../models/adminLogin.class';
import { end, on, send } from './../slots';

export function init() {

  on('check/administrator', (event: any, arg: AdminLogin) => {
    const admin = <AdminLogin>Settings.get('admin');
    let accepted = false;
    if (arg.username === admin.username && arg.password === admin.password) {
      accepted = true;
    }
    send(event, 'check/administrator', (accepted) ? admin : false);
  });

  on('post/administrator', (event: any, arg: AdminLogin) => {
    Settings.set('admin', arg);
    end(event);
  });

  on('get/administrator', (event: any, arg: any) => {
    send(event, 'get/administrator', <AdminLogin>Settings.get('admin'));
  });

}
