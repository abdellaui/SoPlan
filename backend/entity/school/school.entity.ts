import { IsAlpha, IsNotEmpty, MaxLength } from 'class-validator';
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { FormElement, Input } from '../../models/formBuilder.class';
import { Location } from '../_location/location.entity';
import { Comment } from '../comment/comment.entity';
import { Person } from '../person/person.entity';

@Entity()
export class School extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @MaxLength(255)
  @IsAlpha()
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
  name: 'Schulname',
  member: 'name',
  element: new Input('text')
}];

export { SchoolSchema };
