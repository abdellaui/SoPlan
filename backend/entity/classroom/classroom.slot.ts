import { on, send } from '../../slots';
import { Classroom } from './classroom.entity';

export function init() {

  on('get/classroom/all', (event: any, arg: any) => {
    Classroom.find().then((result: Classroom[]) => {
      send(event, 'get/classroom/all', result);
    }).catch(e => {
      send(event, 'get/classroom/all', 0);
    });
  });


  on('get/classroom/by/id', (event: any, arg: number) => {
    Classroom.findOneOrFail(arg).then((result: Classroom) => {
      send(event, 'get/classroom/by/id', result);
    }).catch(e => {
      send(event, 'get/classroom/by/id', 0);
    });
  });

  on('post/classroom', (event: any, arg: any) => {
    Classroom.create(arg).save().then((result: Classroom) => {
      send(event, 'post/classroom', result);
    }).catch(e => {
      send(event, 'post/classroom', 0);
    });
  });


  /**
   * END DEFAULT SLOTS
   */

  on('get/classroom/by/venueId', (event: any, arg: number) => {
    Classroom.getByVenue(arg).then((result: Classroom[]) => {
      send(event, 'get/classroom/by/venueId', result);
    }).catch(e => {
      send(event, 'get/classroom/by/venueId', 0);
    });
  });
}
