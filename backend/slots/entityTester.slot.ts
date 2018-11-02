import { Communication } from '../entity/_communication/communicaton.entity';
import { Location } from '../entity/_location/location.entity';
import { Room } from '../entity/_room/room.entity';
import { Bedroom, BedroomTypes } from '../entity/bedroom/bedroom.entity';
import { Classroom } from '../entity/classroom/classroom.entity';
import { Person, PersonGender } from '../entity/person/person.entity';
import { School } from '../entity/school/school.entity';
import { Venue } from '../entity/venue/venue.entity';

export async function init() {

  const location = new Location();
  location.city = 'Bochum';
  location.country = 'Deutschland';
  location.postalcode = '44809';
  location.street = 'Meinegüte';
  location.subThoroughfare = '111 a';

  const communication = new Communication();
  communication.mobile = '0049 177 999999';
  communication.phone = '0049 234 55555';
  communication.mail = 'noreply@gmail.com';

  const venue = new Venue();
  venue.contactPerson = 'Max Mustermann';
  venue.name = 'Am Stiepel';
  venue.location = location;
  venue.communication = communication;

  const venueInstance = await venue.save();

  const room = new Room();
  room.corridor = 'yesbaby';
  room.floor = 'unterbrücke';
  room.name = 'kp';
  room.number = 23;
  room.size = 50;

  const bedroom = new Bedroom();
  bedroom.type = BedroomTypes.DOZENT;
  bedroom.venue = venueInstance;
  bedroom.room = room;
  bedroom.save();

  const classroom = new Classroom();
  classroom.identifier = 'NA 04/444';
  classroom.room = room; // chill its just for example
  classroom.venue = venueInstance;
  classroom.comment = 'Brudo war hier!';
  classroom.save();

  const school = new School();
  school.name = 'Goethe Schule';
  school.location = location; // chill baby
  const schoolInstance = await school.save();

  const person = new Person();
  person.firstname = 'Robin';
  person.surname = 'Salamanda';
  person.gender = PersonGender.DIVERSE;
  person.birthDate = new Date('1995-07-16');
  person.comment = 'authistisch veranlagt';
  person.location = location; // chill
  person.school = schoolInstance;
  person.communication = communication; // chill
  person.foodIntolerance = 'none';
  person.save();

}
