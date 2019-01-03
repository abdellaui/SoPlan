import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { FormElement, Input } from '../../models/formBuilder.class';
import { I18n } from '../../models/translation/i18n.class';
import { Location } from '../_location/location.entity';
import { Comment } from '../comment/comment.entity';
import { Person } from '../person/person.entity';

@Entity()
export class School extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty({ message: I18n.resolve('school_mandatory') })
  @IsString({ message: I18n.resolve('school_name_warning') })
  @Column()
  name: string;

  @ValidateNested()
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
  name: I18n.resolve('school_name'),
  member: 'name',
  element: new Input('text')
}];

export { SchoolSchema };
