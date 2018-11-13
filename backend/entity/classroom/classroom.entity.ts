import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Room } from '../_room/room.entity';
import { Comment } from '../comment/comment.entity';
import { Group } from '../group/group.entity';
import { Venue } from '../venue/venue.entity';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Input, FormElement } from '../../models/formBuilder.class';

@Entity()
export class Classroom extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column(type => Room)
  room: Room;

  // interne Bezeichung des Zimmers
  @IsOptional()
  @Column()
  identifier: string;

  @ManyToMany(type => Comment)
  @JoinTable()
  comments: Comment[];

  @ManyToOne(type => Venue, venue => venue.classrooms)
  venue: Venue;

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




