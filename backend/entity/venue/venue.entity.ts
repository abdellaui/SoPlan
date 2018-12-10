import { IsNotEmpty, IsString } from 'class-validator';
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { FormElement, Input } from '../../models/formBuilder.class';
import { Communication } from '../_communication/communicaton.entity';
import { Location } from '../_location/location.entity';
import { Bedroom } from '../bedroom/bedroom.entity';
import { Classroom } from '../classroom/classroom.entity';
import { Comment } from '../comment/comment.entity';
import { Event } from '../event/event.entity';

@Entity()
export class Venue extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @IsString({ message: 'Der Name ist nicht gültig' })
  @IsNotEmpty({ message: 'Pflichtfeld' })
  @Column()
  name: string;

  @IsNotEmpty({ message: 'Pflichtfeld' })
  @Column()
  contactPerson: string;

  @Column(type => Location)
  location: Location;

  @Column(type => Communication)
  communication: Communication;

  /**
   * RELATIONS
   */

  @ManyToMany(type => Comment, comment => comment.venues, { eager: true })
  @JoinTable()
  comments: Comment[];

  @OneToMany(type => Bedroom, bedroom => bedroom.venue)
  bedrooms: Bedroom[];

  @OneToMany(type => Classroom, classroom => classroom.venue)
  classrooms: Classroom[];

  @OneToMany(type => Event, event => event.hosting)
  hosts: Event[];

  /**
   * STATIC METHODS
   */

  static getAllEvents(venueId: number) {
    return Event.getByVenue(venueId);
  }
  static getAllClassrooms(venueId: number) {
    return Classroom.getByVenue(venueId);
  }
  static getAllBedrooms(venueId: number) {
    return Bedroom.getByVenue(venueId);
  }

  /**
   * METHODS
   */
  getAllEvents() {
    return Venue.getAllEvents(this.id);
  }
  getAllClassrooms() {
    return Venue.getAllClassrooms(this.id);
  }
  getAllBedrooms() {
    return Venue.getAllBedrooms(this.id);
  }
}

const VenueSchema: FormElement[] = [
  {
    name: 'Ort',
    member: 'name',
    element: new Input('text')
  },
  {
    name: 'Kontaktperson',
    member: 'contactPerson',
    element: new Input('text')
  },
];

export { VenueSchema };
