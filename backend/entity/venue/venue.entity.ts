import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Communication } from '../_communication/communicaton.entity';
import { Location } from '../_location/location.entity';
import { Bedroom } from '../bedroom/bedroom.entity';
import { Classroom } from '../classroom/classroom.entity';
import { Comment } from '../comment/comment.entity';
import { Event } from '../event/event.entity';

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

  @ManyToMany(type => Comment)
  @JoinTable()
  comments: Comment[];

  @OneToMany(type => Bedroom, bedroom => bedroom.venue)
  bedrooms: Bedroom[];

  @OneToMany(type => Classroom, classroom => classroom.venue)
  classrooms: Classroom[];

  @OneToMany(type => Event, event => event.hosting)
  hosts: Event[];

}
