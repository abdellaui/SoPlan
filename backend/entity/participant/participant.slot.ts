import { logException, on, send } from '../../slots';
import { Participant } from './participant.entity';

export function init() {

  on('get/participant/all', (event: any) => {
    Participant.find().then((result: Participant[]) => {
      send(event, 'get/participant/all', result);
    }).catch(e => {
      logException(e);
      send(event, 'get/participant/all', 0);
    });
  });

  on('get/participant/by/id', (event: any, arg: number) => {
    Participant.findOneOrFail(arg).then((result: Participant) => {
      send(event, 'get/participant/by/id', result);
    }).catch(e => {
      logException(e);
      send(event, 'get/participant/by/id', 0);
    });
  });

  on('post/participant', (event: any, arg: any) => {
    Participant.create(arg).save().then((result: Participant) => {
      send(event, 'post/participant', result);
    }).catch(e => {
      logException(e);
      send(event, 'post/participant', 0);
    });
  });

  on('delete/participant', (event: any, arg: any) => {
    // TODO: maybe check if other participants wants to be with this one
    const instance = Participant.create(arg);
    const _id = instance.id;
    instance.remove().then(() => {
      send(event, 'delete/participant', { deleted: true, id: _id });
    }).catch(e => {
      logException(e);
      send(event, 'delete/participant', { deleted: false, id: -1 });
    });
  });

  /**
   * END DEFAULT SLOTS
   */
}
