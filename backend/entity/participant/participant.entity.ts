import { IsInt, IsNotEmpty, IsOptional, Max, Min } from 'class-validator';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  Unique,
} from 'typeorm';

import { FormElement, Input, Option, RadioButton } from '../../models/formBuilder.class';
import { I18n } from '../../models/translation/i18n.class';
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
@Unique(['person', 'event']) // eine Person kann nur einmal Teilnehmen!
export class Participant extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty({ message: I18n.resolve('participant_mandatory') })
  @Column({ type: 'enum', enum: ParticipantRole })
  role: ParticipantRole = ParticipantRole.SCHUELER;

  @IsOptional()
  @IsInt({ message: I18n.resolve('participant_grade_level_warning') })
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

  // eager on wantsToBeWith wont work, because of circularity, so relationid makes wantsToBeWith accessible
  @RelationId((participant: Participant) => participant.wantsToBeWith)
  ids_wantsToBeWith: number[];

  /**
   * STATIC METHODS
   */
  static getByBedroom(searchId: number): Promise<Participant[]> {
    return Participant.findAll({ bedroom: { id: searchId } });
  }

  static getByGroup(searchId: number): Promise<Participant[]> {
    return Participant.findAll({ group: { id: searchId } });
  }

  static getByEvent(searchId: number): Promise<Participant[]> {
    return Participant.findAll({ event: { id: searchId } });
  }

  static getByPerson(searchId: number): Promise<Participant[]> {
    return Participant.findAll({ person: { id: searchId } });
  }

  /**
   *  following methods are manual handwritten, because typeorm was unable
   *  to create efficient queries for entity with much of eagier loading relations
   */

  static findAll(where?: any): Promise<Participant[]> {
    // (this as any) fallback
    return (this as any).createQueryBuilder('participant')
      .leftJoinAndSelect('participant.person', 'person')
      .leftJoinAndSelect('person.school', 'school')
      .leftJoinAndSelect('participant.group', 'group')
      .leftJoinAndSelect('participant.bedroom', 'bedroom')
      .leftJoinAndSelect('participant.event', 'event')
      .where(where)
      .getMany();
  }

  static findOnePerformant(_id: number): Promise<Participant> {
    // (this as any) fallback
    return (this as any).createQueryBuilder('participant')
      .where({ participant: { id: _id } })
      .leftJoinAndSelect('participant.person', 'person')
      .leftJoinAndSelect('person.school', 'school')
      .leftJoinAndSelect('participant.group', 'group')
      .leftJoinAndSelect('participant.bedroom', 'bedroom')
      .leftJoinAndSelect('participant.event', 'event')
      .leftJoinAndSelect('participant.comments', 'comment')
      .getOne();
  }

}

const ParticipantSchema: FormElement[] = [
  {
    name: I18n.resolve('participant_role'),
    member: 'role',
    element: new RadioButton([
      new Option(I18n.resolve('participant_student'), ParticipantRole.SCHUELER),
      new Option(I18n.resolve('participant_teacher'), ParticipantRole.DOZENT),
      new Option(I18n.resolve('participant_studentteacher'), ParticipantRole.SCHUELERDOZENT),
    ])
  },
  {
    name: I18n.resolve('participant_grade_level'),
    member: 'grade',
    element: new Input('number')
  }
];

export { ParticipantSchema };
