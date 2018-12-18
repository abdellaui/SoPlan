import { ErrorRequest } from '../../models/errorRequest.class';
import { on, send } from '../../slots';
import { Participant } from '../participant/participant.entity';
import { Bedroom } from './bedroom.entity';

export function init() {

  on('get/bedroom/all', (event: any) => {
    Bedroom.find().then((result: Bedroom[]) => {
      send(event, 'get/bedroom/all', result);
    }).catch(e => {
      send(event, 'get/bedroom/all', ErrorRequest.create(e));
    });
  });

  on('get/bedroom/by/id', (event: any, arg: number) => {
    Bedroom.findOneOrFail(arg).then((result: Bedroom) => {
      send(event, 'get/bedroom/by/id', result);
    }).catch(e => {
      send(event, 'get/bedroom/by/id', ErrorRequest.create(e, arg));
    });
  });

  on('post/bedroom', (event: any, arg: any) => {
    Bedroom.create(arg).save().then((result: Bedroom) => {
      send(event, 'post/bedroom', result);
    }).catch(e => {
      send(event, 'post/bedroom', ErrorRequest.create(e, arg));
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
      send(event, 'delete/bedroom', Object.assign(ErrorRequest.create(e, arg), { deleted: false, id: -1 }));
    });
  });

  /**
   * END DEFAULT SLOTS
   */

}
