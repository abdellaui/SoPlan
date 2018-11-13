import { Column } from 'typeorm';
import { IsNotEmpty, IsAlphanumeric, IsOptional } from 'class-validator';
import { FormElement, Input } from '../../models/formBuilder.class';

/**
 * This is an embedded entity
 * for more information read http://typeorm.io/#/embedded-entities
 */

export class Room {

  @IsNotEmpty()
  @IsAlphanumeric()
  @Column()
  floor: string;

  @IsOptional()
  @Column()
  corridor: string;

  @IsNotEmpty()
  @Column()
  number: number;

  @IsOptional()
  @Column()
  name: string;

  @IsNotEmpty()
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
    member: 'cpacity',
    element: new Input('text')
  },


];

export { RoomSchema };
