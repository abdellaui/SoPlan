import { IsEmail, IsOptional } from 'class-validator';
import { Column } from 'typeorm';

import { FormElement, Input } from '../../models/formBuilder.class';

/**
 * This is an embedded entity
 * for more information read http://typeorm.io/#/embedded-entities
 */

export class Communication {

  @IsOptional()
  @Column({ nullable: true })
  phone: string;

  @IsOptional()
  @Column({ nullable: true })
  mobile: string;

  @IsOptional()
  @IsEmail()
  @Column({ nullable: true })
  mail: string;

}

const CommunicationSchema: FormElement[] = [
  {
    name: 'Festnetz',
    member: 'phone',
    element: new Input('text')
  },
  {
    name: 'Telefonnummer',
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


