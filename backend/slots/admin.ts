import * as Settings from 'electron-settings';

import { AdminLogin } from '../models/configs.class';
import { end, on, send } from './../slots';

export function init() {

  const defaultAdminLogin: AdminLogin = {
    username: 'admin',
    password: 'cGFzc3dvcmQ=' // => base64('password')
  };

  if (!Settings.has('admin')) {
    Settings.set('admin', defaultAdminLogin);
  }


  on('get/administrator/auth', (event: any, arg: AdminLogin) => {
    const admin = <AdminLogin>Settings.get('admin');
    let accepted = false;
    if (arg.username === admin.username && arg.password === admin.password) {
      accepted = true;
    }
    send(event, 'get/administrator/auth', (accepted) ? admin : false);
  });

  on('post/administrator', (event: any, arg: AdminLogin) => {
    Settings.set('admin', arg);
    end(event);
  });

  on('get/administrator', (event: any) => {
    send(event, 'get/administrator', <AdminLogin>Settings.get('admin'));
  });

}
