import * as Settings from 'electron-settings';
import { getConnection } from 'typeorm';

import { AdminLogin } from './../models/adminLogin.class';
import { DatabaseConfig } from './../models/databaseConfig.class';
import { end, on, send } from './../slots';

export function init() {
  const defaultDatabaseConfigs: DatabaseConfig = {
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: 'password',
    database: 'database'
  };

  const defaultAdminLogin: AdminLogin = {
    username: 'admin',
    password: 'cGFzc3dvcmQ=' // => base64('password')
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
    send(event, 'get/database/connection', getConnection('default').isConnected);
  });

  on('get/database/config', (event: any, arg: any) => {
    send(event, 'get/database/config', <DatabaseConfig>Settings.get('dbconfig'));
  });

  on('post/database/config', (event: any, arg: DatabaseConfig) => {
    Settings.set('dbconfig', arg);
    end(event);
  });

}