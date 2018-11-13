import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Comment } from '../comment/comment.entity';
import { Group } from '../group/group.entity';
import { Participant } from '../participant/participant.entity';
import { Venue } from '../venue/venue.entity';
import { IsNotEmpty } from 'class-validator';
import { FormElement, Input } from '../../models/formBuilder.class';

@Entity()
export class Event extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @ManyToMany(type => Comment)
  @JoinTable()
  comments: Comment[];

  @ManyToOne(type => Venue, venue => venue.hosts)
  hosting: Venue;

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
