import { logException, on, send } from '../../slots';
import { Participant } from '../participant/participant.entity';
import { Group } from './group.entity';

export function init() {

  on('get/group/all', (event: any) => {
    Group.find().then((result: Group[]) => {
      send(event, 'get/group/all', result);
    }).catch(e => {
      logException(e);
      send(event, 'get/group/all', 0);
    });
  });

  on('get/group/by/id', (event: any, arg: number) => {
    Group.findOneOrFail(arg).then((result: Group) => {
      send(event, 'get/group/by/id', result);
    }).catch(e => {
      logException(e);
      send(event, 'get/group/by/id', 0);
    });
  });

  on('post/group', (event: any, arg: any) => {
    Group.create(arg).save().then((result: Group) => {
      send(event, 'post/group', result);
    }).catch(e => {
      logException(e);
      send(event, 'post/group', 0);
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
      logException(e);
      send(event, 'delete/group', { deleted: false, id: -1 });
    });
  });

  /**
   * END DEFAULT SLOTS
   */

}
