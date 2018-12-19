import { IsEmail, IsOptional, IsPhoneNumber } from 'class-validator';
import { Column } from 'typeorm';
import { I18n } from '../../../src/translation/language';

import { FormElement, Input } from '../../models/formBuilder.class';

/**
 * This is an embedded entity
 * for more information read http://typeorm.io/#/embedded-entities
 */

export class Communication {

  @IsOptional()
  @IsPhoneNumber('DE', { message: I18n.resolve('communication_phone_warning') })
  @Column({ nullable: true })
  phone: string;

  @IsOptional()
  @IsPhoneNumber('DE', { message: I18n.resolve('communication_phone_warning') })
  @Column({ nullable: true })
  mobile: string;

  @IsOptional()
  @IsEmail({}, {
    message: I18n.resolve('communication_mail_warning')
  })
  @Column({ nullable: true })
  mail: string;
}

const CommunicationSchema: FormElement[] = [
  {
    name: I18n.resolve('communication_landline'),
    member: 'phone',
    element: new Input('text')
  },
  {
    name: I18n.resolve('communication_mobile'),
    member: 'mobile',
    element: new Input('text')
  },
  {
    name: I18n.resolve('communication_mail'),
    member: 'mail',
    element: new Input('text')
  },
];
export { CommunicationSchema };


