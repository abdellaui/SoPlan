import { Column } from 'typeorm';

/**
 * This is an embedded entity
 * for more information read http://typeorm.io/#/embedded-entities
 */

export class Communication {

  @Column()
  phone: string;

  @Column()
  mobile: string;

  @Column()
  mail: string;

}
