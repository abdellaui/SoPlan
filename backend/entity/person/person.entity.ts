import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Communication } from '../_communication/communicaton.entity';
import { Location } from '../_location/location.entity';
import { Comment } from '../comment/comment.entity';
import { Participant } from '../participant/participant.entity';
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


  @ManyToMany(type => Comment)
  @JoinTable()
  comments: Comment[];

  @ManyToOne(type => School, school => school.students)
  school: School;

  @OneToMany(type => Participant, participant => participant.person)
  participantes: Participant[];
}
