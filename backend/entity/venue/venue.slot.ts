import { ErrorRequest } from '../../models/errorRequest.class';
import { on, send } from '../../slots';
import { Bedroom } from '../bedroom/bedroom.entity';
import { Classroom } from '../classroom/classroom.entity';
import { Event } from '../event/event.entity';
import { Venue } from './venue.entity';

export function init() {

  on('get/venue/all', (event: any) => {
    Venue.find().then((result: Venue[]) => {
      send(event, 'get/venue/all', result);
    }).catch(e => {
      send(event, 'get/venue/all', ErrorRequest.create(e));
    });
  });


  on('get/venue/by/id', (event: any, arg: number) => {
    Venue.findOneOrFail(arg).then((result: Venue) => {
      send(event, 'get/venue/by/id', result);
    }).catch(e => {
      send(event, 'get/venue/by/id', ErrorRequest.create(e, arg));
    });
  });


  on('post/venue', (event: any, arg: any) => {
    Venue.create(arg).save().then((result: Venue) => {
      send(event, 'post/venue', result);
    }).catch(e => {
      send(event, 'post/venue', ErrorRequest.create(e, arg));
    });
  });

  on('delete/venue', (event: any, arg: any) => {
    const instance = Venue.create(arg);
    const _id = instance.id;
    Promise.all([
      instance.getAllEvents(),
      instance.getAllClassrooms(),
      instance.getAllBedrooms(),
    ]).then((result: (Event | Classroom | Bedroom)[]) => {
      if (result.length === 0) { // falls kein Event oder Klassenraum oder Schlafraum existieren
        instance.remove();
        send(event, 'delete/venue', { deleted: true, id: _id });
      } else {
        send(event, 'delete/venue', { deleted: false, id: _id });
      }
    }).catch(e => {
      send(event, 'delete/venue', Object.assign(ErrorRequest.create(e, arg), { deleted: false, id: -1 }));
    });
  });

  /**
   * END DEFAULT SLOTS
   */

  on('get/venue/classrooms', (event: any, arg: { id: number }) => {
    Venue.getAllClassrooms(arg.id).then((result: Classroom[]) => {
      send(event, 'get/venue/classrooms', result);
    }).catch(e => {
      send(event, 'get/venue/classrooms', ErrorRequest.create(e, arg));
    });
  });

  on('get/venue/bedrooms', (event: any, arg: { id: number }) => {
    Venue.getAllBedrooms(arg.id).then((result: Bedroom[]) => {
      send(event, 'get/venue/bedrooms', result);
    }).catch(e => {
      send(event, 'get/venue/bedrooms', ErrorRequest.create(e, arg));
    });
  });
}
