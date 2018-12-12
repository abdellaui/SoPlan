import { IsInt, IsNotEmpty, IsOptional, Max, Min } from 'class-validator';
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { FormElement, Input, Option, RadioButton } from '../../models/formBuilder.class';
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
  role: ParticipantRole = ParticipantRole.SCHUELER;

  @IsOptional()
  @IsInt({ message: 'Klassenstufe muss zwischen 1 bis 13 sein!' })
  @Min(1)
  @Max(13)
  @Column({ nullable: true })
  grade: number;

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

  /**
   * STATIC METHODS
   */
  static getByBedroom(searchId: number) {
    // (this as any) fallback
    return (this as any).find({ where: { bedroom: { id: searchId } } });
  }

  static getByGroup(searchId: number) {
    // (this as any) fallback
    return (this as any).find({ where: { group: { id: searchId } } });
  }

  static getByEvent(searchId: number) {
    // (this as any) fallback
    return (this as any).find({ where: { event: { id: searchId } } });
  }

  static getByPerson(searchId: number) {
    // (this as any) fallback
    return (this as any).find({ where: { person: { id: searchId } } });
  }


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
  },
  {
    name: 'Klassenstufe',
    member: 'grade',
    element: new Input('number')
  }
];

export { ParticipantSchema };
