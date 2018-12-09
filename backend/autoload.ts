// this file will be generated automaticly
// do not remove </import> / </execute> tags
// <import>
import { init as slot_entity_bedroom_bedroom } from './entity/bedroom/bedroom.slot';
import { init as slot_entity_classroom_classroom } from './entity/classroom/classroom.slot';
import { init as slot_entity_comment_comment } from './entity/comment/comment.slot';
import { init as slot_entity_event_event } from './entity/event/event.slot';
import { init as slot_entity_group_group } from './entity/group/group.slot';
import { init as slot_entity_participant_participant } from './entity/participant/participant.slot';
import { init as slot_entity_person_person } from './entity/person/person.slot';
import { init as slot_entity_school_school } from './entity/school/school.slot';
import { init as slot_entity_venue_venue } from './entity/venue/venue.slot';
import { init as slot_slots_einstellungen } from './slots/einstellungen.slot';
import { init as slot_slots_mail } from './slots/mail.slot';
import { init as slot_slots_pdf } from './slots/pdf.slot';

// </import>

export function init(): any {

  // <execute>
  slot_entity_bedroom_bedroom();
  slot_entity_classroom_classroom();
  slot_entity_comment_comment();
  slot_entity_event_event();
  slot_entity_group_group();
  slot_entity_participant_participant();
  slot_entity_person_person();
  slot_entity_school_school();
  slot_entity_venue_venue();
  slot_slots_einstellungen();
  slot_slots_mail();
  slot_slots_pdf();
  // </execute>

}

