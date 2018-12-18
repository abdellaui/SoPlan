import { ErrorRequest } from '../../models/errorRequest.class';
import { on, send } from '../../slots';
import { Comment } from './comment.entity';

export function init() {

  on('get/comment/all', (event: any) => {
    Comment.find().then((result: Comment[]) => {
      send(event, 'get/comment/all', result);
    }).catch(e => {
      send(event, 'get/comment/all', ErrorRequest.create(e));
    });
  });

  on('get/comment/by/id', (event: any, arg: number) => {
    Comment.findOneOrFail(arg).then((result: Comment) => {
      send(event, 'get/comment/by/id', result);
    }).catch(e => {
      send(event, 'get/comment/by/id', ErrorRequest.create(e, arg));
    });
  });

  on('post/comment', (event: any, arg: any) => {
    Comment.create(arg).save().then((result: Comment) => {
      send(event, 'post/comment', result);
    }).catch(e => {
      send(event, 'post/comment', ErrorRequest.create(e, arg));
    });
  });

  on('delete/comment', (event: any, arg: any) => {
    const instance = Comment.create(arg);
    const _id = instance.id;
    instance.remove().then(() => {
      send(event, 'delete/comment', { deleted: true, id: _id });
    }).catch(e => {
      send(event, 'delete/comment', Object.assign(ErrorRequest.create(e, arg), { deleted: false, id: -1 }));
    });
  });

  /**
   * END DEFAULT SLOTS
   */
}
