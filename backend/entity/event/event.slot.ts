import { on, send } from '../../slots';
import { Event } from './event.entity';

export function init() {

  on('get/event/all', (event: any, arg: any) => {
    Event.find().then((result: Event[]) => {
      send(event, 'get/event/all', result);
    }).catch(e => {
      send(event, 'get/event/all', 0);
    });
  });


  on('get/event/by/id', (event: any, arg: number) => {
    Event.findOneOrFail(arg).then((result: Event) => {
      send(event, 'get/event/by/id', result);
    }).catch(e => {
      send(event, 'get/event/by/id', 0);
    });
  });


  on('post/event', (event: any, arg: any) => {
    Event.create(arg).save().then((result: Event) => {
      send(event, 'post/event', result);
    }).catch(e => {
      send(event, 'post/event', 0);
    });
  });
}
