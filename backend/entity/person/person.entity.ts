import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Communication } from '../_communication/communicaton.entity';
import { Location } from '../_location/location.entity';
import { School } from '../school/school.entity';

export enum PersonGender {
  MALE = 'm',
  FEMALE = 'w',
  DIVERSE = 'd'
}

@Entity()
export class Person extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  surname: string;

  @Column({ type: 'enum', enum: PersonGender })
  gender: PersonGender;

  @Column()
  birthDate: Date;

  @Column(type => Communication)
  communication: Communication;

  // Lebensmittelausschlüsse
  // Umfasst auch Vegetarisch, Vegan, Halal
  @Column()
  foodIntolerance: string;

  @Column(type => Location)
  location: Location;

  @Column()
  comment: string;

  @ManyToOne(type => School, school => school.students)
  school: School;
}
