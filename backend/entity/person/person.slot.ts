import { ErrorRequest } from '../../models/errorRequest.class';
import { logException, on, send } from '../../slots';
import { Participant } from '../participant/participant.entity';
import { Person } from './person.entity';

export function init() {

  on('get/person/all', (event: any) => {
    Person.find().then((result: Person[]) => {
      send(event, 'get/person/all', result);
    }).catch(e => {
      logException(e);
      send(event, 'get/person/all', ErrorRequest.create(e));
    });
  });


  on('get/person/by/id', (event: any, arg: number) => {
    Person.findOneOrFail(arg).then((result: Person) => {
      send(event, 'get/person/by/id', result);
    }).catch(e => {
      send(event, 'get/person/by/id', ErrorRequest.create(e, arg));
    });
  });


  on('post/person', (event: any, arg: any) => {
    Person.create(arg).save().then((result: Person) => {
      send(event, 'post/person', result);
    }).catch(e => {
      send(event, 'post/person', ErrorRequest.create(e, arg));
    });
  });

  on('delete/person', (event: any, arg: any) => {
    const instance = Person.create(arg);
    const _id = instance.id;
    Participant.getByPerson(instance.id).then((result: Participant[]) => {
      if (result.length === 0) { // falls kein Teilnehmer
        instance.remove();
        send(event, 'delete/person', { deleted: true, id: _id });
      } else {
        send(event, 'delete/person', { deleted: false, id: _id });
      }
    }).catch(e => {
      send(event, 'delete/person', Object.assign(ErrorRequest.create(e, arg), { deleted: false, id: -1 }));
    });
  });

  /**
   * END DEFAULT SLOTS
   */
}
