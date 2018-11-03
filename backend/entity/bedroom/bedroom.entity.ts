import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Room } from '../_room/room.entity';
import { Comment } from '../comment/comment.entity';
import { Participant } from '../participant/participant.entity';
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

  @ManyToMany(type => Comment)
  @JoinTable()
  comments: Comment[];

  @ManyToOne(type => Venue, venue => venue.bedrooms)
  venue: Venue;

  @OneToMany(type => Participant, participant => participant.bedroom)
  roommates: Participant[];

}
