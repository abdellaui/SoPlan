import { IsAscii, IsNotEmpty, IsOptional } from 'class-validator';
import { Column } from 'typeorm';

import { FormElement, Input } from '../../models/formBuilder.class';

/**
 * This is an embedded entity
 * for more information read http://typeorm.io/#/embedded-entities
 */

export class Room {

  @IsNotEmpty({ message: 'Pflichtfeld' })
  @IsAscii()
  @Column()
  floor: string;

  @IsOptional()
  @Column({ nullable: true })
  corridor: string;

  @IsNotEmpty({ message: 'Pflichtfeld' })
  @Column()
  number: number;

  @IsOptional()
  @Column({ nullable: true })
  name: string;

  @IsNotEmpty({ message: 'Pflichtfeld' })
  @Column()
  capacity: number;

}

const RoomSchema: FormElement[] = [
  {
    name: 'Etage',
    member: 'floor',
    element: new Input('text')
  },

  {
    name: 'Korridor',
    member: 'corrodor',
    element: new Input('text')
  },

  {
    name: 'Zimmernummer',
    member: 'number',
    element: new Input('number')
  },

  {
    name: 'Zimmername',
    member: 'name',
    element: new Input('text')
  },
  {
    name: 'Kapazität',
    member: 'capacity',
    element: new Input('number')
  },


];

export { RoomSchema };
