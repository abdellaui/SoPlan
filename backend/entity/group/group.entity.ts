import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Classroom } from '../classroom/classroom.entity';
import { Comment } from '../comment/comment.entity';
import { Event } from '../event/event.entity';
import { Participant } from '../participant/participant.entity';

@Entity()
export class Group extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  capacity: number;


  @ManyToMany(type => Comment)
  @JoinTable()
  comments: Comment[];

  @OneToOne(type => Classroom, classroom => classroom.group)
  @JoinColumn()
  classroom: Classroom;

  @OneToMany(type => Participant, participant => participant.group)
  members: Participant[];

  @ManyToOne(type => Event, event => event.groups)
  event: Event;
}
