import { logException, on, send } from '../../slots';
import { Participant } from '../participant/participant.entity';
import { Bedroom } from './bedroom.entity';

export function init() {

  on('get/bedroom/all', (event: any) => {
    Bedroom.find().then((result: Bedroom[]) => {
      send(event, 'get/bedroom/all', result);
    }).catch(e => {
      logException(e);
      send(event, 'get/bedroom/all', 0);
    });
  });


  on('get/bedroom/by/id', (event: any, arg: number) => {
    Bedroom.findOneOrFail(arg).then((result: Bedroom) => {
      send(event, 'get/bedroom/by/id', result);
    }).catch(e => {
      logException(e);
      send(event, 'get/bedroom/by/id', 0);
    });
  });


  on('post/bedroom', (event: any, arg: any) => {
    Bedroom.create(arg).save().then((result: Bedroom) => {
      send(event, 'post/bedroom', result);
    }).catch(e => {
      logException(e);
      send(event, 'post/bedroom', 0);
    });
  });

  on('delete/bedroom', (event: any, arg: any) => {
    const instance = Bedroom.create(arg);
    const _id = instance.id;
    Participant.getByBedroom(instance.id).then((result: Participant[]) => {
      if (result.length === 0) { // falls kein Teilnehmer haust
        instance.remove();
        send(event, 'delete/bedroom', { deleted: true, id: _id });
      } else {
        send(event, 'delete/bedroom', { deleted: false, id: _id });
      }
    }).catch(e => {
      logException(e);
      send(event, 'delete/bedroom', { deleted: false, id: -1 });
    });
  });

  /**
   * END DEFAULT SLOTS
   */

  on('get/bedroom/by/venueId', (event: any, arg: number) => {
    Bedroom.getByVenue(arg).then((result: Bedroom[]) => {
      send(event, 'get/bedroom/by/venueId', result);
    }).catch(e => {
      logException(e);
      send(event, 'get/bedroom/by/venueId', 0);
    });
  });
}
