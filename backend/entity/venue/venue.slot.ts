import { on, send } from '../../slots';
import { Venue } from './venue.entity';

export function init() {

  on('get/venue/all', (event: any, arg: any) => {
    Venue.find().then((result: Venue[]) => {
      send(event, 'get/venue/all', result);
    }).catch(e => {
      send(event, 'get/venue/all', 0);
    });
  });


  on('get/venue/by/id', (event: any, arg: number) => {
    Venue.findOneOrFail(arg).then((result: Venue) => {
      send(event, 'get/venue/by/id', result);
    }).catch(e => {
      send(event, 'get/venue/by/id', 0);
    });
  });


  on('post/venue', (event: any, arg: any) => {
    Venue.create(arg).save().then((result: Venue) => {
      send(event, 'post/venue', result);
    }).catch(e => {
      send(event, 'post/venue', 0);
    });
  });
}
