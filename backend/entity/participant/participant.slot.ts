import { on, send } from '../../slots';
import { Participant } from './participant.entity';

export function init() {

  on('get/participant/all', (event: any, arg: any) => {
    Participant.find().then((result: Participant[]) => {
      send(event, 'get/participant/all', result);
    }).catch(e => {
      send(event, 'get/participant/all', 0);
    });
  });


  on('get/participant/by/id', (event: any, arg: number) => {
    Participant.findOneOrFail(arg).then((result: Participant) => {
      send(event, 'get/participant/by/id', result);
    }).catch(e => {
      send(event, 'get/participant/by/id', 0);
    });
  });

  on('get/participant/by/eventId', (event: any, arg: number) => {
    Participant.getRepository()
      .createQueryBuilder('participant')
      .where('participant.eventId = :id', { id: arg })
      .getMany().then((result: Participant[]) => {
        send(event, 'get/participant/by/eventId', result);
      }).catch(e => {
        send(event, 'get/participant/by/eventId', 0);
      });
  });


  on('post/participant', (event: any, arg: any) => {
    Participant.create(arg).save().then((result: Participant) => {
      send(event, 'post/participant', result);
    }).catch(e => {
      send(event, 'post/participant', 0);
    });
  });
}
