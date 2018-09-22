import * as Settings from 'electron-settings';
import { Connection, ConnectionOptions, createConnection } from 'typeorm';

import { init as initSlots } from './autoload';
import { init as initDatabaseSlots } from './database.slot';
import { User } from './entity/user/user.entity';

export class Database {

  private connection: Connection;
  private options: ConnectionOptions;

  constructor(config?: Object) {

    initDatabaseSlots();

    let dbConfig: any;
    if (config) {
      dbConfig = config;
    } else {
      dbConfig = Settings.get('dbconfig');
    }

    this.options = {
      name: 'default',
      type: 'mysql',
      host: dbConfig.host,
      port: dbConfig.port,
      username: dbConfig.username,
      password: dbConfig.password,
      database: dbConfig.database,
      entities: [User],
      synchronize: true,
      logging: false,
    };


    createConnection(this.options).then((conn: Connection) => {
      this.connection = conn;
      this.slots();
    }).catch((e: Error) => {
      console.log(e, this.connection);
      throw e;
    });

  }

  close(): void {
    if (this.connection) { this.connection.close(); }
  }

  private slots(): void {
    try {
      initSlots();
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
