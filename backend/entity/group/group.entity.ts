import { IsNotEmpty, IsPositive, MaxLength } from 'class-validator';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
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

  /**
   * RELATIONS
   */

  @ManyToMany(type => Comment, comment => comment.groups, { eager: true })
  @JoinTable()
  comments: Comment[];

  @ManyToOne(type => Classroom, classroom => classroom.groups, { eager: true })
  classroom: Classroom;
  @RelationId((group: Group) => group.classroom)
  classroomId: number;

  @OneToMany(type => Participant, participant => participant.group)
  members: Participant[];

  @ManyToOne(type => Event, event => event.groups, { eager: true })
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

