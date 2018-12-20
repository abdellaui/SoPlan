import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DatePicker, FormElement, Input, Option, RadioButton, TextArea } from '../../models/formBuilder.class';
import { Communication } from '../_communication/communicaton.entity';
import { Location } from '../_location/location.entity';
import { Comment } from '../comment/comment.entity';
import { Participant } from '../participant/participant.entity';
import { School } from '../school/school.entity';
import { I18n } from '../../../src/translation/language';

export enum PersonGender {
  MALE = 'm',
  FEMALE = 'w',
  DIVERSE = 'd'
}

@Entity()
export class Person extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty({ message: I18n.resolve('person_mandatory') })
  @IsString({ message: I18n.resolve('person_firstname_warning') })
  @Column()
  firstname: string;

  @IsNotEmpty({ message:  I18n.resolve('person_mandatory') })
  @IsString({ message: I18n.resolve('person_surename_warning') })
  @Column()
  surname: string;

  @IsNotEmpty({ message: I18n.resolve('person_mandatory') })
  @Column({ type: 'enum', enum: PersonGender })
  gender: PersonGender;

  @IsDateString({ message: I18n.resolve('person_mandatory') })
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
    name: I18n.resolve('person_firstname'),
    member: 'firstname',
    element: new Input('text')
  },
  {
    name: I18n.resolve('person_surename'),
    member: 'surname',
    element: new Input('text')
  },

  {
    name: I18n.resolve('person_gender'),
    member: 'gender',
    element: new RadioButton([
      new Option(I18n.resolve('person_male'), PersonGender.MALE),
      new Option(I18n.resolve('person_female'), PersonGender.FEMALE),
      new Option(I18n.resolve('person_diverse'), PersonGender.DIVERSE),
    ])
  },
  {
    name: I18n.resolve('person_birthdate'),
    member: 'birthDate',
    element: new DatePicker()
  },
  {
    name: I18n.resolve('person_allergies'),
    member: 'foodIntolerance',
    element: new TextArea(false, '(optional)')
  }
];
export { PersonSchema };


