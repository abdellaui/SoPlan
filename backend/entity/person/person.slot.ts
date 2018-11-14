import { on, send } from '../../slots';
import { Person } from './person.entity';

export function init() {

  on('get/person/all', (event: any, arg: any) => {
    Person.find().then((result: Person[]) => {
      send(event, 'get/person/all', result);
    }).catch(e => {
      send(event, 'get/person/all', 0);
    });
  });


  on('get/person/by/id', (event: any, arg: number) => {
    Person.findOneOrFail(arg).then((result: Person) => {
      send(event, 'get/person/by/id', result);
    }).catch(e => {
      send(event, 'get/person/by/id', 0);
    });
  });


  on('post/person', (event: any, arg: any) => {
    Person.create(arg).save().then((result: Person) => {
      send(event, 'post/person', result);
    }).catch(e => {
      send(event, 'post/person', 0);
    });
  });
}
