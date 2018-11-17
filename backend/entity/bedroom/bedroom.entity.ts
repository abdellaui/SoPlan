import { IsNotEmpty } from 'class-validator';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

import { FormElement, Option, RadioButton } from '../../models/formBuilder.class';
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

  @IsNotEmpty()
  @Column({ type: 'enum', enum: BedroomTypes })
  type: BedroomTypes;


  /**
   * RELATIONS
   */

  @ManyToMany(type => Comment, comment => comment.bedrooms, { eager: true })
  @JoinTable()
  comments: Comment[];

  @ManyToOne(type => Venue, venue => venue.bedrooms)
  venue: Venue;
  @RelationId((bed_room: Bedroom) => bed_room.venue)
  venueId: number;

  @OneToMany(type => Participant, participant => participant.bedroom)
  roommates: Participant[];

}

const BedroomSchema: FormElement[] = [
  {
    name: 'Typ',
    member: 'type',
    element: new RadioButton([
      new Option('Schüler', BedroomTypes.SCHUELER),
      new Option('Dozent', BedroomTypes.DOZENT),
      new Option('<i>gesperrt</i>', BedroomTypes.GESPERRT),
    ])
  }
];

export { BedroomSchema };

