import { IsNotEmpty, ValidateNested } from 'class-validator';
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { FormElement, Option, RadioButton } from '../../models/formBuilder.class';
import { I18n } from '../../models/translation/i18n.class';
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

  @ValidateNested()
  @Column(type => Room)
  room: Room;

  @IsNotEmpty({ message: I18n.resolve('bedroom_mandatory') })
  @Column({ type: 'enum', enum: BedroomTypes })
  type: BedroomTypes;


  /**
   * RELATIONS
   */

  @ManyToMany(type => Comment, comment => comment.bedrooms, { eager: true })
  @JoinTable()
  comments: Comment[];

  @ManyToOne(type => Venue, venue => venue.bedrooms, { eager: true })
  venue: Venue;

  @OneToMany(type => Participant, participant => participant.bedroom)
  roommates: Participant[];

  /**
   * STATIC METHODS
   */
  static getByVenue(searchId: number) {
    // (this as any) fallback
    return (this as any).find({ where: { venue: { id: searchId } } });
  }
}

const BedroomSchema: FormElement[] = [
  {
    name: I18n.resolve('bedroom_type'),
    member: 'type',
    element: new RadioButton([
      new Option(I18n.resolve('bedroom_student'), BedroomTypes.SCHUELER),
      new Option(I18n.resolve('bedroom_teacher'), BedroomTypes.DOZENT),
      new Option(I18n.resolve('bedroom_closed'), BedroomTypes.GESPERRT),
    ])
  }
];

export { BedroomSchema };

