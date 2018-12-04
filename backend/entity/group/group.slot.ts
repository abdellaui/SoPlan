import { on, send } from '../../slots';
import { Group } from './group.entity';

export function init() {

  on('get/group/all', (event: any, arg: any) => {
    Group.find().then((result: Group[]) => {
      send(event, 'get/group/all', result);
    }).catch(e => {
      send(event, 'get/group/all', 0);
    });
  });


  on('get/group/by/id', (event: any, arg: number) => {
    Group.findOneOrFail(arg).then((result: Group) => {
      send(event, 'get/group/by/id', result);
    }).catch(e => {
      send(event, 'get/group/by/id', 0);
    });
  });


  on('post/group', (event: any, arg: any) => {
    Group.create(arg).save().then((result: Group) => {
      send(event, 'post/group', result);
    }).catch(e => {
      send(event, 'post/group', 0);
    });
  });
}
