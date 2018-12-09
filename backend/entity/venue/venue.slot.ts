import { logException, on, send } from '../../slots';
import { Bedroom } from '../bedroom/bedroom.entity';
import { Classroom } from '../classroom/classroom.entity';
import { Event } from '../event/event.entity';
import { Venue } from './venue.entity';

export function init() {

  on('get/venue/all', (event: any) => {
    Venue.find().then((result: Venue[]) => {
      send(event, 'get/venue/all', result);
    }).catch(e => {
      logException(e);
      send(event, 'get/venue/all', 0);
    });
  });


  on('get/venue/by/id', (event: any, arg: number) => {
    Venue.findOneOrFail(arg).then((result: Venue) => {
      send(event, 'get/venue/by/id', result);
    }).catch(e => {
      logException(e);
      send(event, 'get/venue/by/id', 0);
    });
  });


  on('post/venue', (event: any, arg: any) => {
    Venue.create(arg).save().then((result: Venue) => {
      send(event, 'post/venue', result);
    }).catch(e => {
      logException(e);
      send(event, 'post/venue', 0);
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
      logException(e);
      send(event, 'delete/venue', { deleted: false, id: -1 });
    });
  });


}
