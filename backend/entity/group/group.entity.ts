import { IsNotEmpty } from 'class-validator';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { FormElement, Input } from '../../models/formBuilder.class';
import { Classroom } from '../classroom/classroom.entity';
import { Comment } from '../comment/comment.entity';
import { Event } from '../event/event.entity';
import { Participant } from '../participant/participant.entity';

@Entity()
@Unique(['classroom', 'event']) // ein Klassenzimmer pro Gruppe
export class Group extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty({ message: 'Pflichtfeld' })
  @Column()
  name: string;

  @IsNotEmpty({ message: 'Pflichtfeld' })
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

  @OneToMany(type => Participant, participant => participant.group)
  members: Participant[];

  @ManyToOne(type => Event, event => event.groups, { eager: true })
  event: Event;

  /**
  * METHODS
  */

  static getByEvent(searchId: number) {
    // (this as any) fallback
    return (this as any).find({ where: { event: { id: searchId } } });
  }

  static getByClassroom(searchId: number) {
    // (this as any) fallback
    return (this as any).find({ where: { classroom: { id: searchId } } });
  }

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

