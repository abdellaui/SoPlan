import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Generated, OneToMany, ManyToOne } from 'typeorm';
import {Person} from '../person/person.entity';

@Entity()
export class School {

  @Column({
    type: 'int',    // Typ Integer
    primary: true,  // Primärschlüssel
    unique: true,   // Der Wert ist unique (durch Primary eigentlich bereits sicher...)
    readonly: true, // Der Wert kann nach dem Einfügen nicht mehr verändert werden
    name: 'lid'     // Tabellenzeile (in der MySql Tabelle) heißt 'pid'
  })
  @Generated('increment')
  lid: number;

  // Schule
  @Column({
    type: 'varchar',
    length: 255,
    name: 'school'
  })
  school: string;

  // PLZ Schule
  @Column({
    type: 'varchar',
    length: 255,
    name: 'school_plz'
  })
  school_plz: string;

  // Ort Schule
  @Column({
    type: 'varchar',
    length: 255,
    name: 'school_city'
  })
  school_city: string;

  @OneToMany(type => School, school => school.venue)
    schools: School[];

}
