import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { FormElement, TextArea } from '../../models/formBuilder.class';
import { Bedroom } from '../bedroom/bedroom.entity';
import { Classroom } from '../classroom/classroom.entity';
import { Event } from '../event/event.entity';
import { Group } from '../group/group.entity';
import { Participant } from '../participant/participant.entity';
import { Person } from '../person/person.entity';
import { School } from '../school/school.entity';
import { Venue } from '../venue/venue.entity';
import { I18n } from '../../../src/translation/language';

@Entity()
export class Comment extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty({ message: I18n.resolve('comment_mandatory') })
  @Column()
  content: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  /**
   * RELATIONS
   */

  @ManyToMany(type => Bedroom, bedroom => bedroom.comments)
  bedrooms: Bedroom[];

  @ManyToMany(type => Classroom, classroom => classroom.comments)
  classrooms: Classroom[];

  @ManyToMany(type => Event, event => event.comments)
  events: Event[];

  @ManyToMany(type => Group, group => group.comments)
  groups: Group[];

  @ManyToMany(type => Participant, participant => participant.comments)
  participants: Participant[];

  @ManyToMany(type => Person, person => person.comments)
  persons: Person[];

  @ManyToMany(type => School, school => school.comments)
  schools: School[];

  @ManyToMany(type => Venue, venues => venues.comments)
  venues: Venue[];
}

const CommentSchema: FormElement[] = [
  {
    name: I18n.resolve('comment_content'),
    member: 'content',
    element: new TextArea()
  },
];

export { CommentSchema };

