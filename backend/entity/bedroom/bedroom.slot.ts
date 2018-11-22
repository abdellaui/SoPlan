import { on, send } from '../../slots';
import { Bedroom } from './bedroom.entity';

export function init() {

  on('get/bedroom/all', (event: any, arg: any) => {
    Bedroom.find().then((result: Bedroom[]) => {
      send(event, 'get/bedroom/all', result);
    }).catch(e => {
      send(event, 'get/bedroom/all', 0);
    });
  });


  on('get/bedroom/by/id', (event: any, arg: number) => {
    Bedroom.findOneOrFail(arg).then((result: Bedroom) => {
      send(event, 'get/bedroom/by/id', result);
    }).catch(e => {
      send(event, 'get/bedroom/by/id', 0);
    });
  });

  on('get/bedroom/by/venueId', (event: any, arg: number) => {
    Bedroom.getRepository()
      .createQueryBuilder('bedroom')
      .where('bedroom.venueId = :id', { id: arg })
      .getMany().then((result: Bedroom[]) => {
        send(event, 'get/bedroom/by/venueId', result);
      }).catch(e => {
        send(event, 'get/bedroom/by/venueId', 0);
      });
  });


  on('post/bedroom', (event: any, arg: any) => {
    Bedroom.create(arg).save().then((result: Bedroom) => {
      send(event, 'post/bedroom', result);
    }).catch(e => {
      send(event, 'post/bedroom', 0);
    });
  });
}
