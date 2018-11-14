import { IsNotEmpty, IsPositive, MaxLength } from 'class-validator';
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
  RelationId,
} from 'typeorm';

import { FormElement, Input } from '../../models/formBuilder.class';
import { Classroom } from '../classroom/classroom.entity';
import { Comment } from '../comment/comment.entity';
import { Event } from '../event/event.entity';
import { Participant } from '../participant/participant.entity';

@Entity()
export class Group extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @MaxLength(255)
  @Column()
  name: string;

  @IsNotEmpty()
  @IsPositive()
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
  @RelationId((group: Group) => group.event)
  eventId: number;
}

const GroupSchema: FormElement[] = [
  {
    name: 'Gruppenname',
    member: 'name',
    element: new Input('text')
  },
  {
    name: 'Kapazität',
    member: 'capacity',
    element: new Input('number')
  }
];

export { GroupSchema };

