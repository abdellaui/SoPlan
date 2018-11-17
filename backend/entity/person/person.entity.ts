import { IsAlpha, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
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

import { DatePicker, FormElement, Input, Option, RadioButton, TextArea } from '../../models/formBuilder.class';
import { Communication } from '../_communication/communicaton.entity';
import { Location } from '../_location/location.entity';
import { Comment } from '../comment/comment.entity';
import { Participant } from '../participant/participant.entity';
import { School } from '../school/school.entity';

export enum PersonGender {
  MALE = 'm',
  FEMALE = 'w',
  DIVERSE = 'd'
}

@Entity()
export class Person extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsAlpha()
  @MaxLength(255)
  @Column()
  firstname: string;

  @IsNotEmpty()
  @IsAlpha()
  @MaxLength(255)
  @Column()
  surname: string;

  @IsNotEmpty()
  @Column({ type: 'enum', enum: PersonGender })
  gender: PersonGender;

  @IsNotEmpty()
  @Column()
  birthDate: Date;

  @Column(type => Communication)
  communication: Communication;

  // Lebensmittelausschlüsse
  // Umfasst auch Vegetarisch, Vegan, Halal
  @IsOptional()
  @MaxLength(255)
  @Column({ nullable: true })
  foodIntolerance: string;

  @Column(type => Location)
  location: Location;


  /**
   * RELATIONS
   */

  @ManyToMany(type => Comment, comment => comment.persons, { eager: true })
  @JoinTable()
  comments: Comment[];

  @ManyToOne(type => School, school => school.students, { eager: true })
  school: School;
  @RelationId((person: Person) => person.school)
  schoolId: number;

  @OneToMany(type => Participant, participant => participant.person)
  participantes: Participant[];
}


const PersonSchema: FormElement[] = [
  {
    name: 'Vorname',
    member: 'firstname',
    element: new Input('text')
  },
  {
    name: 'Nachname',
    member: 'surname',
    element: new Input('text')
  },

  {
    name: 'Geschlecht',
    member: 'gender',
    element: new RadioButton([
      new Option('männlich', PersonGender.MALE),
      new Option('weiblich', PersonGender.FEMALE),
      new Option('diverse', PersonGender.DIVERSE),
    ])
  },
  {
    name: 'Geburtsdatum',
    member: 'birthDate',
    element: new DatePicker()
  },
  {
    name: 'Alergien',
    member: 'foodIntolerance',
    element: new TextArea(false, '(optional)')
  }
];
export { PersonSchema };


