import { ErrorRequest } from '../../models/errorRequest.class';
import { on, send } from '../../slots';
import { Person } from '../person/person.entity';
import { School } from './school.entity';

export function init() {

  on('get/school/all', (event: any) => {
    School.find().then((result: School[]) => {
      send(event, 'get/school/all', result);
    }).catch(e => {
      send(event, 'get/school/all', ErrorRequest.create(e));
    });
  });


  on('get/school/by/id', (event: any, arg: number) => {
    School.findOneOrFail(arg).then((result: School) => {
      send(event, 'get/school/by/id', result);
    }).catch(e => {
      send(event, 'get/school/by/id', ErrorRequest.create(e, arg));
    });
  });


  on('post/school', (event: any, arg: any) => {
    School.create(arg).save().then((result: School) => {
      send(event, 'post/school', result);
    }).catch(e => {
      send(event, 'post/school', ErrorRequest.create(e, arg));
    });
  });

  on('delete/school', (event: any, arg: any) => {
    const instance = School.create(arg);
    const _id = instance.id;
    Person.getBySchool(instance.id).then((result: Person[]) => {
      if (result.length === 0) { // falls kein Gruppen quatieren
        instance.remove();
        send(event, 'delete/school', { deleted: true, id: _id });
      } else {
        send(event, 'delete/school', { deleted: false, id: _id });
      }
    }).catch(e => {
      send(event, 'delete/school', Object.assign(ErrorRequest.create(e, arg), { deleted: false, id: -1 }));
    });
  });

  /**
   * END DEFAULT SLOTS
   */
}
