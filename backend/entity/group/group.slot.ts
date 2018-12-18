import { ErrorRequest } from '../../models/errorRequest.class';
import { on, send } from '../../slots';
import { Participant } from '../participant/participant.entity';
import { Group } from './group.entity';

export function init() {

  on('get/group/all', (event: any) => {
    Group.find().then((result: Group[]) => {
      send(event, 'get/group/all', result);
    }).catch(e => {
      send(event, 'get/group/all', ErrorRequest.create(e));
    });
  });

  on('get/group/by/id', (event: any, arg: number) => {
    Group.findOneOrFail(arg).then((result: Group) => {
      send(event, 'get/group/by/id', result);
    }).catch(e => {
      send(event, 'get/group/by/id', ErrorRequest.create(e, arg));
    });
  });

  on('post/group', (event: any, arg: any) => {
    Group.create(arg).save().then((result: Group) => {
      send(event, 'post/group', result);
    }).catch(e => {
      send(event, 'post/group', ErrorRequest.create(e, arg));
    });
  });

  on('delete/group', (event: any, arg: any) => {
    const instance = Group.create(arg);
    const _id = instance.id;
    Participant.getByGroup(instance.id).then((result: Participant[]) => {
      if (result.length === 0) { // falls kein Gruppen quatieren
        instance.remove();
        send(event, 'delete/group', { deleted: true, id: _id });
      } else {
        send(event, 'delete/group', { deleted: false, id: _id });
      }
    }).catch(e => {
      send(event, 'delete/group', Object.assign(ErrorRequest.create(e, arg), { deleted: false, id: -1 }));
    });
  });

  /**
   * END DEFAULT SLOTS
   */

}
