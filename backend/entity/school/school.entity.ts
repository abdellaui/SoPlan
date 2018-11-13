import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Location } from '../_location/location.entity';
import { Person } from '../person/person.entity';
import { IsAscii, IsNotEmpty } from 'class-validator';
import { FormElement, Input } from '../../models/formBuilder.class';

@Entity()
export class School extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsAscii()
  @Column()
  name: string;

  @Column(type => Location)
  location: Location;

  @OneToMany(type => Person, person => person.school)
  students: Person[];

}

const SchoolSchema: FormElement[] = [{
  name: 'Schulname',
  member: 'name',
  element: new Input('text')
}];

export { SchoolSchema };
