import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
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

  @IsNotEmpty({ message: 'Pflichtfeld' })
  @IsString({ message: 'Der Vorname ist nicht gültig' })
  @Column()
  firstname: string;

  @IsNotEmpty({ message: 'Pflichtfeld' })
  @IsString({ message: 'Der Name ist nicht gültig' })
  @Column()
  surname: string;

  @IsNotEmpty({ message: 'Pflichtfeld' })
  @Column({ type: 'enum', enum: PersonGender })
  gender: PersonGender;

  @IsNotEmpty({ message: 'Pflichtfeld' })
  @Column()
  birthDate: Date;

  @Column(type => Communication)
  communication: Communication;

  // Lebensmittelausschlüsse
  // Umfasst auch Vegetarisch, Vegan, Halal
  @IsOptional()
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

  @OneToMany(type => Participant, participant => participant.person)
  participantes: Participant[];

  /**
  * STATIC METHODS
  */
  static getBySchool(searchId: number) {
    // (this as any) fallback
    return (this as any).find({ where: { school: { id: searchId } } });
  }


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


