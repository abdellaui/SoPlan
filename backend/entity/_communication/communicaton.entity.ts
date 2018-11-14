import { IsEmail, IsOptional, IsNumberString } from 'class-validator';
import { Column } from 'typeorm';

import { FormElement, Input } from '../../models/formBuilder.class';

/**
 * This is an embedded entity
 * for more information read http://typeorm.io/#/embedded-entities
 */

export class Communication {

  @IsNumberString()
  @IsOptional()
  @Column({
    default: ''
  })
  phone: string;

  @IsNumberString()
  @IsOptional()
  @Column({
    default: ''
  })
  mobile: string;

  @IsOptional()
  @IsEmail()
  @Column({
    default: ''
  })
  mail: string;

}

const CommunicationSchema: FormElement[] = [
  {
    name: 'Telefonnummer',
    member: 'phone',
    element: new Input('text')
  },
  {
    name: 'Handynummer',
    member: 'mobile',
    element: new Input('text')
  },
  {
    name: 'E-Mail',
    member: 'mail',
    element: new Input('text')
  },
];
export { CommunicationSchema };


