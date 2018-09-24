import * as Settings from 'electron-settings';
import { Connection, ConnectionOptions, createConnection } from 'typeorm';

import { init as initSlots } from './autoload';
import { init as initDatabaseSlots } from './database.slot';
import { User } from './entity/user/user.entity';
import { DatabaseConfig } from './models/databaseConfig.class';
import { slotException } from './slots';

export class Database {

  private options: ConnectionOptions;
  private connection: Connection = null;
  constructor(config?: DatabaseConfig) {

    initDatabaseSlots();

    const dbConfig: any = (config) ? config : <DatabaseConfig>Settings.get('dbconfig');

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
      slotException(e, true, true);
    });
  }

  close(): void {
    if (this.connection) {
      this.connection.close();
    }

  }

  private slots(): void {
    try {
      initSlots();
    } catch (e) {
      console.log(e);
    }
  }
}
