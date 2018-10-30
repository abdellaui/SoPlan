import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Generated, OneToMany, ManyToOne } from 'typeorm';
import { School } from '@entity/school/school.entity';

@Entity()
export class Person {

  @Column({
    type: 'int',    // Typ Integer
    primary: true,  // Primärschlüssel
    unique: true,   // Der Wert ist unique (durch Primary eigentlich bereits sicher...)
    readonly: true, // Der Wert kann nach dem Einfügen nicht mehr verändert werden
    name: 'pid'     // Tabellenzeile (in der MySql Tabelle) heißt 'pid'
  })
  @Generated('increment')
  pid: number;

  // Vorname
  @Column({
    type: 'varchar',
    length: 255,
    name: 'firstname'
  })
  firstname: string;

  // Nachname
  @Column({
    type: 'varchar',
    length: 255,
    name: 'lastname'
  })
  lastname: string;

  // Geschlecht
  // (m,w,d = männlich, weiblich, divers)
  @Column({
    type: 'varchar',
    length: 255,
    name: 'gender'
  })
  gender: string;

  // Geburtsdatum
  @Column({
    type: 'date',
    name: 'birth_date'
  })
  birth_date: Date;

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

  // E-Mail Adresse
  @Column({
    type: 'varchar',
    length: 255,
    name: 'mail'
  })
  mail: string;

  // Lebensmittelausschlüsse
  // Umfasst auch Vegetarisch, Vegan, Halal
  @Column({
    type: 'varchar',
    length: 255,
    name: 'food_intolerance'
  })
  food_intolerance: string;

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

  // Schule
  @ManyToOne(type => School, school => school.schools)
  school: School;

  // Bemerkungen
  @Column({
    type: 'varchar',
    length: 2048,
    name: 'comment'
  })
  comment: string;

}
