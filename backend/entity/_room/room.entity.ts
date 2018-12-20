import { IsAscii, IsNotEmpty, IsOptional } from 'class-validator';
import { Column } from 'typeorm';

import { FormElement, Input } from '../../models/formBuilder.class';

import { I18n } from '../../../src/translation/language';

/**
 * This is an embedded entity
 * for more information read http://typeorm.io/#/embedded-entities
 */

export class Room {

  @IsNotEmpty({ message: I18n.resolve('room_mandatory') })
  @IsAscii()
  @Column()
  floor: string;

  @IsOptional()
  @Column({ nullable: true })
  corridor: string;

  @IsNotEmpty({ message: I18n.resolve('room_mandatory') })
  @Column()
  number: number;

  @IsOptional()
  @Column({ nullable: true })
  name: string;

  @IsNotEmpty({ message: I18n.resolve('room_mandatory') })
  @Column()
  capacity: number;

}

const RoomSchema: FormElement[] = [
  {
    name: I18n.resolve('room_floor'),
    member: 'floor',
    element: new Input('text')
  },

  {
    name: I18n.resolve('room_corridor'),
    member: 'corridor',
    element: new Input('text')
  },

  {
    name: I18n.resolve('room_number'),
    member: 'number',
    element: new Input('number')
  },

  {
    name: I18n.resolve('room_name'),
    member: 'name',
    element: new Input('text')
  },
  {
    name: I18n.resolve('room_capacity'),
    member: 'capacity',
    element: new Input('number')
  },


];

export { RoomSchema };
