import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Room } from '../_room/room.entity';
import { Venue } from '../venue/venue.entity';

export enum BedroomTypes {
  SCHUELER = 's',
  DOZENT = 'd',
  GESPERRT = 'g'
}

@Entity()
export class Bedroom extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column(type => Room)
  room: Room;

  @Column({ type: 'enum', enum: BedroomTypes })
  type: BedroomTypes;

  @ManyToOne(type => Venue, venue => venue.bedrooms)
  venue: Venue;

}
