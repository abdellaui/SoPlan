import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Communication } from '../_communication/communicaton.entity';
import { Location } from '../_location/location.entity';
import { Bedroom } from '../bedroom/bedroom.entity';
import { Classroom } from '../classroom/classroom.entity';

@Entity()
export class Venue extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  contactPerson: string;

  @Column(type => Location)
  location: Location;

  @Column(type => Communication)
  communication: Communication;

  @OneToMany(type => Bedroom, bedroom => bedroom.venue)
  bedrooms: Bedroom[];

  @OneToMany(type => Classroom, classroom => classroom.venue)
  classrooms: Classroom[];

}
