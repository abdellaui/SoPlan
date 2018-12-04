import { IsAlpha, IsNotEmpty, IsNumberString, MaxLength, IsAlphanumeric, IsString } from 'class-validator';
import { Column } from 'typeorm';

import { FormElement, Input } from '../../models/formBuilder.class';

/**
 * This is an embedded entity
 * for more information read http://typeorm.io/#/embedded-entities
 */

export class Location {

  @IsNotEmpty({ message: 'Pflichtfeld' })
  @Column()
  street: string;

  // Hausnummer
  @IsNotEmpty({ message: 'Pflichtfeld' })
  @Column()
  subThoroughfare: string;

  @IsNotEmpty({ message: 'Pflichtfeld' })
  @IsNumberString({ message: 'Nur DE PLZ zulässig' })
  @MaxLength(5, { message: 'PLZ besteht aus 5 Ziffern' })
  @Column()
  postalcode: string;

  @IsNotEmpty({ message: 'Pflichtfeld' })
  @Column()
  city: string;

  @IsNotEmpty({ message: 'Pflichtfeld' })
  @Column({ default: 'Deutschland' })
  // tslint:disable-next-line:no-inferrable-types
  country: string = 'Deutschland';
}

const LocationSchema: FormElement[] = [
  {
    name: 'Straße',
    member: 'street',
    element: new Input('text')
  },
  {
    name: 'Hausnummer',
    member: 'subThoroughfare',
    element: new Input('text')
  },
  {
    name: 'PLZ',
    member: 'postalcode',
    element: new Input('text')
  },
  {
    name: 'Stadt',
    member: 'city',
    element: new Input('text')
  },
  {
    name: 'Land',
    member: 'country',
    element: new Input('text')
  },
];
export { LocationSchema };
