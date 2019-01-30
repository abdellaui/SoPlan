import * as Settings from 'electron-settings';

import { Bedroom, BedroomTypes } from '../entity/bedroom/bedroom.entity';
import { Classroom } from '../entity/classroom/classroom.entity';
import { Comment } from '../entity/comment/comment.entity';
import { Event } from '../entity/event/event.entity';
import { Group } from '../entity/group/group.entity';
import { Participant, ParticipantRole } from '../entity/participant/participant.entity';
import { Person, PersonGender } from '../entity/person/person.entity';
import { School } from '../entity/school/school.entity';
import { Venue } from '../entity/venue/venue.entity';
// @ts-ignore
import * as data from './result.json';

const GenderMap = { 'm': PersonGender.MALE, 'w': PersonGender.FEMALE, 'd': PersonGender.DIVERSE };
const RoleMap = { 's': ParticipantRole.SCHUELER, 'd': ParticipantRole.DOZENT, 'x': ParticipantRole.SCHUELERDOZENT };
const TypeMap = { 's': BedroomTypes.SCHUELER, 'd': BedroomTypes.DOZENT, 'q': BedroomTypes.GESPERRT };

const randStats = {};
const stats = {};

declare const Object: any;

async function genComments(comments: any): Promise<Comment[]> {
  const returnArr = [];
  for (const comment of comments) {
    let currComment = Comment.create(comment);
    currComment.createdDate = new Date(comment.createdDate);
    currComment = await currComment.save();
    returnArr.push(currComment);
  }
  return returnArr;
}

function resetRandomHistory(name: string, domaene: number = 0): void {
  if (!randStats[domaene]) {
    randStats[domaene] = {};
  }
  randStats[domaene][name] = {};
}

function setStats(name: string, val: number, domaene: number = 0): void {
  if (!stats[domaene]) {
    stats[domaene] = {};
  }
  if (!stats[domaene][name]) {
    stats[domaene][name] = [];
    resetRandomHistory(name, domaene);
  }
  stats[domaene][name].push(val);
}
function getRandomId(name: any, domaene: number = 0): { id: number } {
  // init lookup

  const statLength = stats[domaene][name].length;
  if (JSON.stringify(randStats[domaene][name]) === '{}') {
    for (let i = 0; i < statLength; i++) {
      randStats[domaene][name][i] = 0;
    }
  }


  let randomIndex = -1;
  let round = 1;
  do {
    randomIndex = Math.floor((Math.random() * statLength));

    if (Object.values(randStats[domaene][name]).filter((x: number) => x <= round - 1).length === 0) {
      round++;
      /*
      console.log('######################');
      console.log('round:' + round);
      console.log('domaene:' + domaene);
      console.log('name:' + name);
      console.log('######################');
      */
    }

  } while (randStats[domaene][name][randomIndex] >= round);
  randStats[domaene][name][randomIndex]++;
  return { id: stats[domaene][name][randomIndex] };
}

export async function init() {
  try {
    console.log('data generating....');
    Settings.set('currentEventId', 0);
    // ####### START STATIC PART #########
    // VENUE
    for (const venue of data.venue) {
      let currVenue = Venue.create(venue);
      currVenue.comments = await genComments(venue.comments);
      currVenue = await currVenue.save();
      if (currVenue.id) {

        setStats('venue', currVenue.id);
        // BEDROOM
        for (const bedroom of venue.bedroom) {
          const tempBedroom = { ...bedroom, type: <BedroomTypes>TypeMap[bedroom.type] };
          let currBedroom = Bedroom.create(tempBedroom);
          currBedroom.venue = currVenue;
          currBedroom.comments = await genComments(bedroom.comments);
          currBedroom = await currBedroom.save();
          if (currBedroom.id) {
            setStats('bedroom', currBedroom.id, currVenue.id);
          }
        }
        // END BEDROOM

        // CLASSROOM
        for (const classroom of venue.classroom) {
          let currClassroom = Classroom.create(classroom);
          currClassroom.venue = currVenue;
          currClassroom.comments = await genComments(classroom.comments);
          currClassroom = await currClassroom.save();
          if (currClassroom.id) {
            setStats('classroom', currClassroom.id, currVenue.id);
          }
        }
        // END CLASSROOM
      }
    }
    // END VENUE


    // SCHOOL
    for (const school of data.school) {
      let currSchool = School.create(school);
      currSchool.comments = await genComments(school.comments);
      currSchool = await currSchool.save();
      if (currSchool.id) {

        // PERSON
        for (const person of school.person) {
          const tempPerson = {
            ...person,
            gender: <PersonGender>GenderMap[person.gender],
            birthDate: new Date(person.birthDate).toISOString()
          };

          let currPerson = Person.create(tempPerson);
          currPerson.school = currSchool;
          currPerson.comments = await genComments(person.comments);
          currPerson = await currPerson.save();
          if (currPerson.id) {
            setStats('person', currPerson.id);
          }
        }
        // END PERSON
      }
    }
    // END SCHOOL

    // ####### END STATIC PART #########
    // ####### START DYNAMIC PART #########


    // EVENT
    for (const event of data.event) {
      const tempEvent = {
        ...event,
        startsDate: new Date(event.startsDate).toISOString(),
        endsDate: new Date(event.endsDate).toISOString(),
      };
      let currEvent = Event.create(tempEvent);
      currEvent.hosting = <Venue>getRandomId('venue');
      currEvent.comments = await genComments(event.comments);
      currEvent = await currEvent.save();
      if (currEvent.id) {
        // GROUP
        for (const group of event.group) {
          let currGroup = Group.create(group);
          currGroup.event = currEvent;
          currGroup.classroom = <Classroom>getRandomId('classroom', currEvent.hosting.id);
          currGroup.comments = await genComments(group.comments);
          currGroup = await currGroup.save();
          if (currGroup.id) {
            setStats('group', currGroup.id, currEvent.id);
          }
        }
        // END GROUP
        resetRandomHistory('classroom', currEvent.hosting.id);
        // PARTICIPANT
        for (const participant of event.participant) {
          const tempParticipant = { ...participant, role: <ParticipantRole>RoleMap[participant.role] };
          let currParticipant = Participant.create(tempParticipant);
          currParticipant.event = currEvent;
          currParticipant.person = <Person>getRandomId('person');
          currParticipant.group = <Group>getRandomId('group', currEvent.id);
          currParticipant.bedroom = <Bedroom>getRandomId('bedroom', currEvent.hosting.id);
          currParticipant.comments = await genComments(participant.comments);
          currParticipant = await currParticipant.save();
        }
        // END PARTICIPANT
        resetRandomHistory('person');
        resetRandomHistory('group', currEvent.id);
        resetRandomHistory('bedroom', currEvent.hosting.id);
      }
    }
    // END EVENT

    // ####### END DYNAMIC PART #########

    console.log('\n\n********************************');
    console.log('********************************');
    console.log('****     DATA GENERATED     ****');
    console.log('****  do this on app window ****');
    console.log('****   cmd + R / ctrl + R   ****');
    console.log('********************************');
    console.log('********************************');
    console.log(' please rename executer.slot.ts ');
    console.log(' to executer.slot.inactive.ts  !');
    console.log('********************************');


  } catch (e) {
    console.log(e);
  }
}
