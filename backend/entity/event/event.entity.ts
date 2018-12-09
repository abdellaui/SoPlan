import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { DatePicker, FormElement, Input } from '../../models/formBuilder.class';
import { Bedroom } from '../bedroom/bedroom.entity';
import { Classroom } from '../classroom/classroom.entity';
import { Comment } from '../comment/comment.entity';
import { Group } from '../group/group.entity';
import { Participant } from '../participant/participant.entity';
import { Venue } from '../venue/venue.entity';

@Entity()
export class Event extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty({ message: 'Pflichtfeld' })
  name: string;

  @IsNotEmpty({ message: 'Pflichtfeld' })
  @Column()
  startsDate: Date = new Date();

  @IsNotEmpty({ message: 'Pflichtfeld' })
  @Column()
  endsDate: Date = new Date();
  /**
   * RELATIONS
   */

  @ManyToMany(type => Comment, comment => comment.events, { eager: true })
  @JoinTable()
  comments: Comment[];

  @ManyToOne(type => Venue, venue => venue.hosts, { eager: true })
  hosting: Venue;

  @OneToMany(type => Participant, participant => participant.event)
  participantes: Participant[];

  @OneToMany(type => Group, group => group.event)
  groups: Group[];

  /**
   * STATIC METHODS
   */
  static async getAllClassrooms(eventId: number) {
    try {
      // (this as any) fallback
      const ev = await (this as any).findOne({ id: eventId });
      return Classroom.getByVenue(ev.hosting.id);
    } catch (e) {
      return Promise.reject();
    }
  }

  static async getAllBedrooms(eventId: number) {
    try {
      // (this as any) fallback
      const ev = await (this as any).findOne({ id: eventId });
      return Bedroom.getByVenue(ev.hosting.id);
    } catch (e) {
      return Promise.reject();
    }
  }
  static getByVenue(searchId: number) {
    return (this as any).find({ where: { hosting: { id: searchId } } });
  }
  static getAllGroups(eventId: number) {
    return Group.getByEvent(eventId);
  }
  static getAllParticipants(eventId: number) {
    return Participant.getByEvent(eventId);
  }

  /**
   * METHODS
   */

  getAllGroups() {
    return Event.getAllGroups(this.id);
  }
  getAllParticipants() {
    return Event.getAllParticipants(this.id);
  }
}

const EventSchema: FormElement[] = [
  {
    name: 'Eventname',
    member: 'name',
    element: new Input('text')
  },
  {
    name: 'Startet',
    member: 'startsDate',
    element: new DatePicker()
  },
  {
    name: 'Endet',
    member: 'endsDate',
    element: new DatePicker()
  },
];

export { EventSchema };
