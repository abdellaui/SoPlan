import { IsNotEmpty, MaxLength } from 'class-validator';
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
import { Comment } from '../comment/comment.entity';
import { Group } from '../group/group.entity';
import { Participant } from '../participant/participant.entity';
import { Venue } from '../venue/venue.entity';

@Entity()
export class Event extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;

  /**
   * RELATIONS
   */

  @ManyToMany(type => Comment, comment => comment.events, { eager: true })
  @JoinTable()
  comments: Comment[];

  @ManyToOne(type => Venue, venue => venue.hosts, { eager: true })
  hosting: Venue;
  @RelationId((event: Event) => event.hosting)
  hostingId: number;

  @OneToMany(type => Participant, participant => participant.event)
  participantes: Participant[];

  @OneToMany(type => Group, group => group.event)
  groups: Group[];
}

const EventSchema: FormElement[] = [
  {
    name: 'Eventname',
    member: 'name',
    element: new Input('text')
  }
];

export { EventSchema };
