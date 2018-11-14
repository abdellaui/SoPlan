import { IsAlpha, IsNotEmpty, IsNumberString, MaxLength } from 'class-validator';
import { Column } from 'typeorm';

import { FormElement, Input } from '../../models/formBuilder.class';

/**
 * This is an embedded entity
 * for more information read http://typeorm.io/#/embedded-entities
 */

export class Location {

  @IsNotEmpty()
  @MaxLength(255)
  @Column()
  street: string;

  // Hausnummer
  @IsNotEmpty()
  @MaxLength(255)
  @Column()
  subThoroughfare: string;

  @IsNotEmpty()
  @IsNumberString()
  @MaxLength(5)
  @Column()
  postalcode: string;

  @IsNotEmpty()
  @IsAlpha()
  @MaxLength(255)
  @Column()
  city: string;

  @IsNotEmpty()
  @IsAlpha()
  @MaxLength(255)
  @Column({ default: 'Deutschland' })
  country: string;
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
