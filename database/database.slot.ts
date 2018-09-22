import * as Settings from 'electron-settings';
import { getConnection } from 'typeorm';

import { end, on, send } from './slots';

export function init() {
  const defaultDatabaseConfigs: Object = {
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: 'password',
    database: 'database'
  };

  const defaultAdminLogin: Object = {
    username: 'admin',
    password: 'password' // TODO: store sha256 hashed strings
  };

  // store default connection settings
  if (!Settings.has('dbconfig')) {
    Settings.set('dbconfig', defaultDatabaseConfigs);
  }
  if (!Settings.has('admin')) {
    Settings.set('admin', defaultAdminLogin);
  }
  // slots
  on('get/database/connection', (event: any, arg: any) => {
    send(event, 'get/database/connection', getConnection().isConnected);
  });


  on('get/database/config', (event: any, arg: any) => {
    send(event, 'get/database/config', Settings.get('dbconfig'));
  });

  on('post/database/config', (event: any, arg: any) => {
    Settings.set('dbconfig', arg);
    end(event);
  });

  on('check/administrator', (event: any, arg: any) => {
    const admin = Settings.get('admin');

    if (arg.username === admin.username && arg.password === admin.password) {
      send(event, 'check/administrator', admin);
    } else {
      send(event, 'check/administrator', false);
    }
  });

  on('post/administrator', (event: any, arg: any) => {
    Settings.set('admin', arg);
    end(event);
  });

  on('get/administrator', (event: any, arg: any) => {
    send(event, 'get/administrator', Settings.get('admin'));
  });
}
