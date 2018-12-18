import * as Settings from 'electron-settings';

import { ErrorRequest } from '../../models/errorRequest.class';
import { end, on, send } from '../../slots';
import { Bedroom } from '../bedroom/bedroom.entity';
import { Classroom } from '../classroom/classroom.entity';
import { Group } from '../group/group.entity';
import { Participant } from '../participant/participant.entity';
import { Event } from './event.entity';

export function init() {

  on('get/event/all', (event: any) => {
    Event.find().then((result: Event[]) => {
      send(event, 'get/event/all', result);
    }).catch(e => {
      send(event, 'get/event/all', ErrorRequest.create(e));
    });
  });


  on('get/event/by/id', (event: any, arg: number) => {
    Event.findOneOrFail(arg).then((result: Event) => {
      send(event, 'get/event/by/id', result);
    }).catch(e => {
      send(event, 'get/event/by/id', ErrorRequest.create(e, arg));
    });
  });


  on('post/event', (event: any, arg: any) => {
    Event.create(arg).save().then((result: Event) => {
      send(event, 'post/event', result);
    }).catch(e => {
      send(event, 'post/event', ErrorRequest.create(e, arg));
    });

  });

  on('delete/event', (event: any, arg: any) => {
    const instance = Event.create(arg);
    const _id = instance.id;
    Promise.all([
      instance.getAllParticipants(),
      instance.getAllGroups()
    ]).then((result: (Participant | Group)[]) => {
      if (result.length === 0) { // falls kein Gruppen oder Teilnehmer existieren
        instance.remove();
        send(event, 'delete/event', { deleted: true, id: _id });
      } else {
        send(event, 'delete/event', { deleted: false, id: _id });
      }
    }).catch(e => {
      send(event, 'delete/event', Object.assign(ErrorRequest.create(e, arg), { deleted: false, id: -1 }));
    });
  });

  /**
   * END DEFAULT SLOTS
   */

  on('get/event/current', (event: any) => {
    send(event, 'get/event/current', Settings.get('currentEventId') ? Settings.get('currentEventId') : 0);
  });

  on('set/event/current', (event: any, arg: { id: number }) => {
    Settings.set('currentEventId', arg.id);
    end(event);
  });

  on('get/event/classrooms', (event: any, arg: { id: number }) => {
    Event.getAllClassrooms(arg.id).then((result: Classroom[]) => {
      send(event, 'get/event/classrooms', result);
    }).catch(e => {
      send(event, 'get/event/classrooms', ErrorRequest.create(e, arg));
    });
  });

  on('get/event/bedrooms', (event: any, arg: { id: number }) => {
    Event.getAllBedrooms(arg.id).then((result: Bedroom[]) => {
      send(event, 'get/event/bedrooms', result);
    }).catch(e => {
      send(event, 'get/event/bedrooms', ErrorRequest.create(e, arg));
    });
  });

  on('get/event/groups', (event: any, arg: { id: number }) => {
    Event.getAllGroups(arg.id).then((result: Group[]) => {
      send(event, 'get/event/groups', result);
    }).catch(e => {
      send(event, 'get/event/groups', ErrorRequest.create(e, arg));
    });
  });

  on('get/event/participants', (event: any, arg: { id: number }) => {
    Event.getAllParticipants(arg.id).then((result: Participant[]) => {
      send(event, 'get/event/participants', result);
    }).catch(e => {
      send(event, 'get/event/participants', ErrorRequest.create(e, arg));
    });
  });
}
