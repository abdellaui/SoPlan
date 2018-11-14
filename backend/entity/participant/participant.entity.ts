import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';

import { FormElement, Option, RadioButton } from '../../models/formBuilder.class';
import { Bedroom } from '../bedroom/bedroom.entity';
import { Comment } from '../comment/comment.entity';
import { Event } from '../event/event.entity';
import { Group } from '../group/group.entity';
import { Person } from '../person/person.entity';

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
  @RelationId((participant: Participant) => participant.person)
  personId: number;

  @ManyToOne(type => Group, group => group.members)
  group: Group;
  @RelationId((participant: Participant) => participant.group)
  groupId: number;

  @ManyToOne(type => Bedroom, bedroom => bedroom.roommates)
  bedroom: Bedroom;
  @RelationId((participant: Participant) => participant.bedroom)
  bedroomId: number;

  @ManyToOne(type => Event, event => event.participantes)
  event: Event;
  @RelationId((participant: Participant) => participant.event)
  eventId: number;

  @ManyToMany(type => Participant, participant => participant.wantsToBeWith)
  @JoinTable()
  wantsToBeWith: Participant[];
}

const ParticipantSchema: FormElement[] = [
  {
    name: 'Rolle',
    member: 'role',
    element: new RadioButton([
      new Option('Schüler', ParticipantRole.SCHUELER),
      new Option('Dozent', ParticipantRole.DOZENT),
      new Option('Schülerdozent', ParticipantRole.SCHUELERDOZENT),
    ])
  }
];

export { ParticipantSchema };
