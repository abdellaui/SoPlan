import { IsAlpha, IsNotEmpty, MaxLength, IsString } from 'class-validator';
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FormElement, Input } from '../../models/formBuilder.class';
import { Location } from '../_location/location.entity';
import { Comment } from '../comment/comment.entity';
import { Person } from '../person/person.entity';
import { I18n } from '../../../src/translation/language';
@Entity()
export class School extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty({ message: I18n.resolve('school_mandatory') })
  @IsString({ message: I18n.resolve('school_name_warning') })
  @Column()
  name: string;

  @Column(type => Location)
  location: Location;

  /**
   * RELATIONS
   */

  @ManyToMany(type => Comment, comment => comment.schools, { eager: true })
  @JoinTable()
  comments: Comment[];

  @OneToMany(type => Person, person => person.school)
  students: Person[];

}

const SchoolSchema: FormElement[] = [{
  name: I18n.resolve('person_name'),
  member: 'name',
  element: new Input('text')
}];

export { SchoolSchema };
