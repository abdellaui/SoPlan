import { ErrorRequest } from '../../models/errorRequest.class';
import { on, send } from '../../slots';
import { Participant } from './participant.entity';

export function init() {

  on('get/participant/all', (event: any) => {
    Participant.findAll().then((result: Participant[]) => {
      send(event, 'get/participant/all', result);
    }).catch(e => {
      send(event, 'get/participant/all', ErrorRequest.create(e));
    });
  });

  on('get/participant/by/id', (event: any, arg: number) => {
    Participant.findOnePerformant(arg).then((result: Participant) => {
      send(event, 'get/participant/by/id', result);
    }).catch(e => {
      send(event, 'get/participant/by/id', ErrorRequest.create(e, arg));
    });
  });

  on('post/participant', (event: any, arg: any) => {
    Participant.create(arg).save().then((result: Participant) => {
      send(event, 'post/participant', result);
    }).catch(e => {
      send(event, 'post/participant', ErrorRequest.create(e, arg));
    });
  });

  on('delete/participant', (event: any, arg: any) => {
    // TODO: maybe check if other participants wants to be with this one
    const instance = Participant.create(arg);
    const _id = instance.id;
    instance.remove().then(() => {
      send(event, 'delete/participant', { deleted: true, id: _id });
    }).catch(e => {
      send(event, 'delete/participant', Object.assign(ErrorRequest.create(e, arg), { deleted: false, id: -1 }));
    });
  });

  /**
   * END DEFAULT SLOTS
   */
}
