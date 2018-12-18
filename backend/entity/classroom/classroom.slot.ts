import { ErrorRequest } from '../../models/errorRequest.class';
import { on, send } from '../../slots';
import { Group } from '../group/group.entity';
import { Classroom } from './classroom.entity';

export function init() {

  on('get/classroom/all', (event: any) => {
    Classroom.find().then((result: Classroom[]) => {
      send(event, 'get/classroom/all', result);
    }).catch(e => {
      send(event, 'get/classroom/all', ErrorRequest.create(e));
    });
  });

  on('get/classroom/by/id', (event: any, arg: number) => {
    Classroom.findOneOrFail(arg).then((result: Classroom) => {
      send(event, 'get/classroom/by/id', result);
    }).catch(e => {
      send(event, 'get/classroom/by/id', ErrorRequest.create(e, arg));
    });
  });

  on('post/classroom', (event: any, arg: any) => {
    Classroom.create(arg).save().then((result: Classroom) => {
      send(event, 'post/classroom', result);
    }).catch(e => {
      send(event, 'post/classroom', ErrorRequest.create(e, arg));
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
      send(event, 'delete/classroom', Object.assign(ErrorRequest.create(e, arg), { deleted: false, id: -1 }));
    });
  });

  /**
   * END DEFAULT SLOTS
   */


}
