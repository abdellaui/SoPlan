import { logException, on, send } from '../../slots';
import { Group } from '../group/group.entity';
import { Classroom } from './classroom.entity';

export function init() {

  on('get/classroom/all', (event: any) => {
    Classroom.find().then((result: Classroom[]) => {
      send(event, 'get/classroom/all', result);
    }).catch(e => {
      logException(e);
      send(event, 'get/classroom/all', 0);
    });
  });

  on('get/classroom/by/id', (event: any, arg: number) => {
    Classroom.findOneOrFail(arg).then((result: Classroom) => {
      send(event, 'get/classroom/by/id', result);
    }).catch(e => {
      logException(e);
      send(event, 'get/classroom/by/id', 0);
    });
  });

  on('post/classroom', (event: any, arg: any) => {
    Classroom.create(arg).save().then((result: Classroom) => {
      send(event, 'post/classroom', result);
    }).catch(e => {
      logException(e);
      send(event, 'post/classroom', 0);
    });
  });

  on('delete/classroom', (event: any, arg: any) => {
    const instance = Classroom.create(arg);
    const _id = instance.id;
    Group.getByClassroom(instance.id).then((result: Group[]) => {
      if (result.length === 0) { // falls kein Gruppen quatieren
        instance.remove();
        send(event, 'delete/classroom', { deleted: true, id: _id });
      } else {
        send(event, 'delete/classroom', { deleted: false, id: _id });
      }
    }).catch(e => {
      logException(e);
      send(event, 'delete/classroom', { deleted: false, id: -1 });
    });
  });

  /**
   * END DEFAULT SLOTS
   */


}
