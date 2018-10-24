import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Generated, OneToMany, ManyToOne } from 'typeorm';

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
    length: 30,
    name: 'firstname'
  })
  firstname: string;

  // Nachname
  @Column({
    type: 'varchar',
    length: 30,
    name: 'lastname'
  })
  lastname: string;

  // Geschlecht
  // (m,w,d = männlich, weiblich, divers)
  @Column({
    type: 'varchar',
    length: 1,
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
    length: 30,
    name: 'phone'
  })
  phone: string;

  // Handynummer
  @Column({
    type: 'varchar',
    length: 30,
    name: 'mobile'
  })
  mobile: string;

  // E-Mail Adresse
  @Column({
    type: 'varchar',
    length: 40,
    name: 'mail'
  })
  mail: string;

  // Lebensmittelausschlüsse
  // Umfasst auch Vegetarisch, Vegan, Halal
  @Column({
    type: 'varchar',
    length: 50,
    name: 'food_intolerance'
  })
  food_intolerance: string;

  // Straße
  @Column({
    type: 'varchar',
    length: 40,
    name: 'street'
  })
  street: string;

  // Hausnummer
  @Column({
    type: 'varchar',
    length: 6,
    name: 'hnr'
  })
  hnr: string;

  // PLZ
  @Column({
    type: 'varchar',
    length: 10,
    name: 'plz'
  })
  plz: string;

  // Ort
  @Column({
    type: 'varchar',
    length: 30,
    name: 'city'
  })
  city: string;

  // Land
  @Column({
    type: 'varchar',
    length: 30,
    name: 'country',
    default: 'Deutschland'
  })
  country: string;

  // Schule
  @Column({
    type: 'varchar',
    length: 30,
    name: 'school'
  })
  school: string;

  // PLZ Schule
  @Column({
    type: 'varchar',
    length: 10,
    name: 'school_plz'
  })
  school_plz: string;

  // Ort Schule
  @Column({
    type: 'varchar',
    length: 30,
    name: 'school_city'
  })
  school_city: string;

  // Bemerkungen
  @Column({
    type: 'varchar',
    length: 256,
    name: 'comment'
  })
  comment: string;

}
