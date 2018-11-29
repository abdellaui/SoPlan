import { IsOptional, MaxLength } from 'class-validator';
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  /**
   * RELATIONS
   */

  @ManyToMany(type => Comment, comment => comment.classrooms, { eager: true })
  @JoinTable()
  comments: Comment[];

  @ManyToOne(type => Venue, venue => venue.classrooms, { eager: true })
  venue: Venue;

  @OneToMany(type => Group, group => group.classroom)
  groups: Group[];

  /**
   * METHODS
   */

  static getByVenue(searchId: number) {
        // (this as any) fallback
    return (this as any).createQueryBuilder('classroom')
      .where('classroom.venueId = :id', { id: searchId })
      .getMany();
  }
}

const ClassroomSchema: FormElement[] = [
  {
    name: 'Bezeichnung',
    member: 'identifier',
    element: new Input('text')
  }
];

export { ClassroomSchema };




