import * as Settings from 'electron-settings';

import { end, on, send } from '../../slots';
import { Bedroom } from '../bedroom/bedroom.entity';
import { Classroom } from '../classroom/classroom.entity';
import { Group } from '../group/group.entity';
import { Event } from './event.entity';

export function init() {

  on('get/event/all', (event: any, arg: any) => {
    Event.find().then((result: Event[]) => {
      send(event, 'get/event/all', result);
    }).catch(e => {
      send(event, 'get/event/all', 0);
    });
  });


  on('get/event/by/id', (event: any, arg: number) => {
    Event.findOneOrFail(arg).then((result: Event) => {
      send(event, 'get/event/by/id', result);
    }).catch(e => {
      send(event, 'get/event/by/id', 0);
    });
  });


  on('post/event', (event: any, arg: any) => {
    Event.create(arg).save().then((result: Event) => {
      send(event, 'post/event', result);
    }).catch(e => {
      send(event, 'post/event', 0);
    });

  });

  /**
   * END DEFAULT SLOTS
   */

  on('get/event/current', (event: any, arg: any) => {
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
      send(event, 'get/event/classrooms', 0);
    });
  });

  on('get/event/bedrooms', (event: any, arg: { id: number }) => {
    Event.getAllBedrooms(arg.id).then((result: Bedroom[]) => {
      send(event, 'get/event/bedrooms', result);
    }).catch(e => {
      send(event, 'get/event/bedrooms', 0);
    });
  });

  on('get/event/groups', (event: any, arg: { id: number }) => {
    Event.getAllGroups(arg.id).then((result: Group[]) => {
      send(event, 'get/event/groups', result);
    }).catch(e => {
      send(event, 'get/event/groups', 0);
    });
  });
}
