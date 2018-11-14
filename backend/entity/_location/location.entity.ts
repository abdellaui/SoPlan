import { Column } from 'typeorm';

import { FormElement, Input, TextArea } from '../../models/formBuilder.class';
import { IsNotEmpty, IsAlphanumeric, IsNumberString, IsAlpha, IsOptional } from 'class-validator';

/**
 * This is an embedded entity
 * for more information read http://typeorm.io/#/embedded-entities
 */

export class Location {

  @IsNotEmpty()
  @Column()
  street: string;

  // Hausnummer
  @IsNotEmpty()
  @IsAlphanumeric()
  @Column()
  subThoroughfare: string;

  @IsNotEmpty()
  @IsNumberString()
  @Column()
  postalcode: string;

  @IsAlpha()
  @IsNotEmpty()
  @Column()
  city: string;

  @IsNotEmpty()
  @IsAlpha()
  @IsOptional()
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
    element: new TextArea(false, 'Deutschland')
  },
];
export { LocationSchema };
