import { IsDate, IsEnum, IsNotEmpty, IsAlpha, MaxLength, IsAscii, IsOptional } from 'class-validator';
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
  @MaxLength(50)
  @Column()
  firstname: string;

  @IsNotEmpty()
  @IsAscii()
  @MaxLength(50)
  @Column()
  surname: string;

  @IsNotEmpty()
  @IsEnum(PersonGender)
  @Column({ type: 'enum', enum: PersonGender })
  gender: PersonGender;

  @IsDate()
  @Column()
  birthDate: Date;

  @Column(type => Communication)
  communication: Communication;

  // Lebensmittelausschlüsse
  // Umfasst auch Vegetarisch, Vegan, Halal
  @IsOptional()
  @Column()
  foodIntolerance: string;

  @Column(type => Location)
  location: Location;

  @ManyToMany(type => Comment)
  @JoinTable()
  comments: Comment[];

  @ManyToOne(type => School, school => school.students)
  school: School;

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
  /*
  {
    name: 'Geschlecht',
    member: 'gender',
    element: new SelectBox([
      new Option('männlich', PersonGender.MALE),
      new Option('weiblich', PersonGender.FEMALE),
      new Option('diverse', PersonGender.DIVERSE),
    ], true)
  },*/
  {
    name: 'Geburtsdatum',
    member: 'birthDate',
    element: new DatePicker('dd.MM.yyyy')
  },
  {
    name: 'Alergien',
    member: 'foodIntolerance',
    element: new TextArea(false, '(optional)')
  }
  /*{
    name: 'Alergien',
    member: 'foodIntolerance',
    element: new CheckBox(true)
  }*/
];
export { PersonSchema };


