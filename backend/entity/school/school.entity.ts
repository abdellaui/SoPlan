import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Location } from '../_location/location.entity';
import { Person } from '../person/person.entity';

@Entity()
export class School extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column(type => Location)
  location: Location;

  @OneToMany(type => Person, person => person.school)
  students: Person[];

}
