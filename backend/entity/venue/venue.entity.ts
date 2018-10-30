import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Generated, OneToMany, ManyToOne } from 'typeorm';
import {Bedroom} from '../bedroom/bedroom.entity';
import {Classroom} from '../classroom/classroom.entity';

@Entity()
export class Venue {

  @Column({
    type: 'int',    // Typ Integer
    primary: true,  // Primärschlüssel
    unique: true,   // Der Wert ist unique (durch Primary eigentlich bereits sicher...)
    readonly: true, // Der Wert kann nach dem Einfügen nicht mehr verändert werden
    name: 'lid'     // Tabellenzeile (in der MySql Tabelle) heißt 'pid'
  })
  @Generated('increment')
  lid: number;

  // Name
  @Column({
    type: 'varchar',
    length: 255,
    name: 'name'
  })
  name: string;

  // Ansprechpartner
  @Column({
    type: 'varchar',
    length: 255,
    name: 'contactperson'
  })
  contactperson: string;

  // Straße
  @Column({
    type: 'varchar',
    length: 255,
    name: 'street'
  })
  street: string;

  // Hausnummer
  @Column({
    type: 'varchar',
    length: 255,
    name: 'hnr'
  })
  hnr: string;

  // PLZ
  @Column({
    type: 'varchar',
    length: 255,
    name: 'plz'
  })
  plz: string;

  // Ort
  @Column({
    type: 'varchar',
    length: 255,
    name: 'city'
  })
  city: string;

  // Land
  @Column({
    type: 'varchar',
    length: 255,
    name: 'country',
    default: 'Deutschland'
  })
  country: string;

  // Telefonnummer
  @Column({
    type: 'varchar',
    length: 255,
    name: 'phone'
  })
  phone: string;

  // Handynummer
  @Column({
    type: 'varchar',
    length: 255,
    name: 'mobile'
  })
  mobile: string;

  @OneToMany(type => Bedroom, bedroom => bedroom.venue)
    bedrooms: Bedroom[];

  @OneToMany(type => Classroom, classroom => classroom.venue)
  classrooms: Classroom[];

}
