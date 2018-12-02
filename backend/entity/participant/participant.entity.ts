import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @IsNotEmpty({ message: 'Pflichtfeld' })
  @Column({ type: 'enum', enum: ParticipantRole })
  role: ParticipantRole;

  /**
   * RELATIONS
   */

  @ManyToMany(type => Comment, comment => comment.participants, { eager: true })
  @JoinTable()
  comments: Comment[];

  @ManyToOne(type => Person, person => person.participantes, { eager: true })
  person: Person;

  @ManyToOne(type => Group, group => group.members, { eager: true })
  group: Group;

  @ManyToOne(type => Bedroom, bedroom => bedroom.roommates, { eager: true })
  bedroom: Bedroom;

  @ManyToOne(type => Event, event => event.participantes, { eager: true })
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
      new Option('Schüler', ParticipantRole.SCHUELER),
      new Option('Dozent', ParticipantRole.DOZENT),
      new Option('Schülerdozent', ParticipantRole.SCHUELERDOZENT),
    ])
  }
];

export { ParticipantSchema };
