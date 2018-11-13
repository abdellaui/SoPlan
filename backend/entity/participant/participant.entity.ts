import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Bedroom } from '../bedroom/bedroom.entity';
import { Comment } from '../comment/comment.entity';
import { Event } from '../event/event.entity';
import { Group } from '../group/group.entity';
import { Person } from '../person/person.entity';
import { IsNotEmpty } from 'class-validator';
import { FormElement, RadioButton, Option } from '../../models/formBuilder.class';

export enum ParticipantRole {
  SCHUELER = 's',
  DOZENT = 'd',
  SCHUELERDOZENT = 'x'
}

@Entity()
export class Participant extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ type: 'enum', enum: ParticipantRole })
  role: ParticipantRole;

  @ManyToMany(type => Comment)
  @JoinTable()
  comments: Comment[];

  @ManyToOne(type => Person, person => person.participantes)
  person: Person;

  @ManyToOne(type => Group, group => group.members)
  group: Group;

  @ManyToOne(type => Bedroom, bedroom => bedroom.roommates)
  bedroom: Bedroom;

  @ManyToOne(type => Event, event => event.participantes)
  event: Event;

  @ManyToMany(type => Participant, participant => participant.wantsToBeWith)
  @JoinTable()
  wantsToBeWith: Participant[];
}

const ParticipantSchema: FormElement[] = [
  {
    name: 'Rolle',
    member: 'role',
    element: new RadioButton([
      new Option('schueler', ParticipantRole.SCHUELER),
      new Option('dozent', ParticipantRole.DOZENT),
      new Option('gesperrt', ParticipantRole.SCHUELERDOZENT),
    ])
  }
];

export { ParticipantSchema };
