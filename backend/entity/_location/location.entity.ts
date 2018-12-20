import { IsNotEmpty, IsNumberString, MaxLength } from 'class-validator';
import { Column } from 'typeorm';

import { FormElement, Input } from '../../models/formBuilder.class';
import { I18n } from '../../models/translation/i18n.class';

/**
 * This is an embedded entity
 * for more information read http://typeorm.io/#/embedded-entities
 */

export class Location {

  @IsNotEmpty({ message: I18n.resolve('location_mandatory') })
  @Column()
  street: string;

  // Hausnummer
  @IsNotEmpty({ message: I18n.resolve('location_mandatory') })
  @Column()
  subThoroughfare: string;

  @IsNotEmpty({ message: I18n.resolve('location_mandatory') })
  @IsNumberString({ message: I18n.resolve('location_postalcode_warning') })
  @MaxLength(5, { message: I18n.resolve('location_postalcode_length') })
  @Column()
  postalcode: string;

  @IsNotEmpty({ message: I18n.resolve('location_mandatory') })
  @Column()
  city: string;

  @IsNotEmpty({ message: I18n.resolve('location_mandatory') })
  @Column({ default: I18n.resolve('location_default_country') })
  // tslint:disable-next-line:no-inferrable-types
  country: string = I18n.resolve('location_default_country');
}

const LocationSchema: FormElement[] = [
  {
    name: I18n.resolve('location_street'),
    member: 'street',
    element: new Input('text')
  },
  {
    name: I18n.resolve('location_house_number'),
    member: 'subThoroughfare',
    element: new Input('text')
  },
  {
    name: I18n.resolve('location_postalcode'),
    member: 'postalcode',
    element: new Input('text')
  },
  {
    name: I18n.resolve('location_city'),
    member: 'city',
    element: new Input('text')
  },
  {
    name: I18n.resolve('location_country'),
    member: 'country',
    element: new Input('text')
  },
];
export { LocationSchema };
