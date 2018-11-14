import { on, send } from '../../slots';
import { School } from './school.entity';

export function init() {

  on('get/school/all', (event: any, arg: any) => {
    School.find().then((result: School[]) => {
      send(event, 'get/school/all', result);
    }).catch(e => {
      send(event, 'get/school/all', 0);
    });
  });


  on('get/school/by/id', (event: any, arg: number) => {
    School.findOneOrFail(arg).then((result: School) => {
      send(event, 'get/school/by/id', result);
    }).catch(e => {
      send(event, 'get/school/by/id', 0);
    });
  });


  on('post/school', (event: any, arg: any) => {
    School.create(arg).save().then((result: School) => {
      send(event, 'post/school', result);
    }).catch(e => {
      send(event, 'post/school', 0);
    });
  });
}
