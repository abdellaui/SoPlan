import * as Settings from 'electron-settings';
import { Connection, ConnectionOptions, createConnection } from 'typeorm';

import { init as initSlots } from './autoload';
import { Communication } from './entity/_communication/communicaton.entity';
import { Location } from './entity/_location/location.entity';
import { Room } from './entity/_room/room.entity';
import { Bedroom } from './entity/bedroom/bedroom.entity';
import { Classroom } from './entity/classroom/classroom.entity';
import { Comment } from './entity/comment/comment.entity';
import { Event } from './entity/event/event.entity';
import { Group } from './entity/group/group.entity';
import { Participant } from './entity/participant/participant.entity';
import { Person } from './entity/person/person.entity';
import { School } from './entity/school/school.entity';
import { Venue } from './entity/venue/venue.entity';
import { DatabaseConfig } from './models/configs.class';
import { slotException } from './slots';
import { init as initDatabaseSlots } from './slots/database.slot';


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
      entities: [
        Room,
        Location,
        Communication,
        Venue,
        School,
        Person,
        Classroom,
        Bedroom,
        Event,
        Participant,
        Group,
        Comment,
      ],
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
