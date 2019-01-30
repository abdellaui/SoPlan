import { Communication } from '../entity/_communication/communicaton.entity';
import { Location } from '../entity/_location/location.entity';
import { Room } from '../entity/_room/room.entity';
import { Bedroom, BedroomTypes } from '../entity/bedroom/bedroom.entity';
import { Classroom } from '../entity/classroom/classroom.entity';
import { Comment } from '../entity/comment/comment.entity';
import { Event } from '../entity/event/event.entity';
import { Group } from '../entity/group/group.entity';
import { Participant, ParticipantRole } from '../entity/participant/participant.entity';
import { Person, PersonGender } from '../entity/person/person.entity';
import { School } from '../entity/school/school.entity';
import { Venue } from '../entity/venue/venue.entity';

export async function init() {

  const comment = new Comment();
  comment.content = 'its just a test';
  const commentInstance = await comment.save();

  const location = new Location();
  location.city = 'Bochum';
  location.country = 'Deutschland';
  location.postalcode = '44809';
  location.street = 'Teststr.';
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
  venue.comments = [commentInstance];

  const venueInstance = await venue.save();

  const room = new Room();
  room.corridor = 'Coridor';
  room.floor = 'floor';
  room.name = 'kp';
  room.number = 23;
  room.capacity = 50;

  const bedroom = new Bedroom();
  bedroom.type = BedroomTypes.DOZENT;
  bedroom.venue = venueInstance;
  bedroom.comments = [commentInstance];
  bedroom.room = room;
  const bedroomInstance = await bedroom.save();

  const classroom = new Classroom();
  classroom.identifier = 'NA 04/444';
  classroom.room = room; // chill its just for example
  classroom.venue = venueInstance;
  classroom.comments = [commentInstance];
  const classroomInstance = await classroom.save();

  const school = new School();
  school.name = 'Goethe Schule';
  school.location = location; // chill baby
  const schoolInstance = await school.save();

  const person = new Person();
  person.firstname = 'Naruto';
  person.surname = 'Salamanda';
  person.gender = PersonGender.DIVERSE;
  person.birthDate = new Date('1995-07-16');
  person.comments = [commentInstance];
  person.location = location; // chill
  person.school = schoolInstance;
  person.communication = communication; // chill
  person.foodIntolerance = 'none';
  const personInstance = await person.save();

  const person2 = new Person();
  person2.firstname = 'Songokhu';
  person2.surname = 'Salamanda';
  person2.gender = PersonGender.FEMALE;
  person2.birthDate = new Date('2001-07-16');
  person2.comments = [commentInstance];
  person2.location = location; // chill
  person2.school = schoolInstance;
  person2.communication = communication; // chill
  person2.foodIntolerance = 'none';
  const personInstance2 = await person2.save();

  // STATICS ENDS

  const event = new Event();
  event.name = 'Salamanders!';
  event.hosting = venueInstance;
  event.startsDate = new Date();
  event.endsDate = new Date();
  event.comments = [commentInstance];
  const eventInstance = await event.save();

  const group = new Group();
  group.name = 'krabsbelgruppe';
  group.capacity = 5;
  group.classroom = classroomInstance;
  group.event = eventInstance;
  group.comments = [commentInstance];
  const groupInstance = await group.save();

  const participant = new Participant();
  participant.person = personInstance;
  participant.bedroom = bedroomInstance;
  participant.comments = [commentInstance];
  participant.group = groupInstance;
  participant.event = eventInstance;
  participant.role = ParticipantRole.SCHUELER;
  const participantInstance = await participant.save();

  const participant2 = new Participant();
  participant2.person = personInstance2; // chill
  participant2.bedroom = bedroomInstance;
  participant2.comments = [commentInstance];
  participant2.group = groupInstance;
  participant2.event = eventInstance;
  participant2.role = ParticipantRole.DOZENT;
  participant2.wantsToBeWith = [participantInstance];
  participant2.save();

}
