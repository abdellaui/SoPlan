import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Generated, OneToMany, ManyToOne } from 'typeorm';
import {Venue} from '../venue/venue.entity';

@Entity()
export class Classroom {

  @Column({
    type: 'int',    // Typ Integer
    primary: true,  // Primärschlüssel
    unique: true,   // Der Wert ist unique (durch Primary eigentlich bereits sicher...)
    readonly: true, // Der Wert kann nach dem Einfügen nicht mehr verändert werden
    name: 'bid'     // Tabellenzeile (in der MySql Tabelle) heißt 'pid'
  })
  @Generated('increment')
  bid: number;

  // Etage
  @Column({
    type: 'varchar',
    length: 255,
    name: 'floor'
  })
  floor: string;

  // Flur
  @Column({
    type: 'varchar',
    length: 255,
    name: 'corridor'
  })
  corridor: string;

  // Nummer
  @Column({
    type: 'varchar',
    length: 255,
    name: 'room_number'
  })
  room_number: number;

  // Name
  @Column({
    type: 'varchar',
    length: 255,
    name: 'name'
  })
  name: string;

  // Unser Name
  // Alle Räumen bekommen zusätzliche Namen...
  @Column({
    type: 'varchar',
    length: 255,
    name: 'new_name'
  })
  new_name: string;

  // Größe
  @Column({
    type: 'int',
    name: 'size'
  })
  size: number;

  // Kommentar
  @Column({
    type: 'varchar',
    length: 255,
    name: 'comment'
  })
  comment: string;

  @ManyToOne(type => Venue, venue => venue.classrooms)
    venue: Venue;

}
