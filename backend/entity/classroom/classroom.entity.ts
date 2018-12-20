import { IsOptional } from 'class-validator';
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { FormElement, Input } from '../../models/formBuilder.class';
import { I18n } from '../../models/translation/i18n.class';
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
   * STATIC METHODS
   */

  static getByVenue(searchId: number) {
    // (this as any) fallback
    return (this as any).find({ where: { venue: { id: searchId } } });
  }
}

const ClassroomSchema: FormElement[] = [
  {
    name: I18n.resolve('classroom_name'),
    member: 'identifier',
    element: new Input('text')
  }
];

export { ClassroomSchema };




