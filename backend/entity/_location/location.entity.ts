import { Column } from 'typeorm';

/**
 * This is an embedded entity
 * for more information read http://typeorm.io/#/embedded-entities
 */

export class Location {

  @Column()
  street: string;

  // Hausnummer
  @Column()
  subThoroughfare: string;

  @Column()
  postalcode: string;

  @Column()
  city: string;

  @Column({ default: 'Deutschland' })
  country: string;
}
