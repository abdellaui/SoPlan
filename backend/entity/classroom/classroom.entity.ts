import { IsOptional, MaxLength } from 'class-validator';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

import { FormElement, Input } from '../../models/formBuilder.class';
import { Room } from '../_room/room.entity';
import { Comment } from '../comment/comment.entity';
import { Group } from '../group/group.entity';
import { Venue } from '../venue/venue.entity';

@Entity()
export class Classroom extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column(type => Room)
  room: Room;

  // interne Bezeichung des Zimmers
  @IsOptional()
  @MaxLength(255)
  @Column({ nullable: true })
  identifier: string;

  @ManyToMany(type => Comment)
  @JoinTable()
  comments: Comment[];

  @ManyToOne(type => Venue, venue => venue.classrooms)
  venue: Venue;
  @RelationId((class_room: Classroom) => class_room.venue)
  venueId: number;

  @OneToOne(type => Group, group => group.classroom)
  group: Group;
}

const ClassroomSchema: FormElement[] = [
  {
    name: 'Bezeichnung',
    member: 'identifier',
    element: new Input('text')
  }
];

export { ClassroomSchema };




