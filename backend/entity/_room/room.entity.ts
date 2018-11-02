import { Column } from 'typeorm';

/**
 * This is an embedded entity
 * for more information read http://typeorm.io/#/embedded-entities
 */

export class Room {

  @Column()
  floor: string;

  @Column()
  corridor: string;

  @Column()
  number: number;

  @Column()
  name: string;

  @Column()
  size: number;

}
