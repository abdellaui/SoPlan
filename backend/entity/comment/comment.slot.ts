import { logException, on, send } from '../../slots';
import { Comment } from './comment.entity';

export function init() {

  on('get/comment/all', (event: any) => {
    Comment.find().then((result: Comment[]) => {
      send(event, 'get/comment/all', result);
    }).catch(e => {
      logException(e);
      send(event, 'get/comment/all', 0);
    });
  });


  on('get/comment/by/id', (event: any, arg: number) => {
    Comment.findOneOrFail(arg).then((result: Comment) => {
      send(event, 'get/comment/by/id', result);
    }).catch(e => {
      logException(e);
      send(event, 'get/comment/by/id', 0);
    });
  });


  on('post/comment', (event: any, arg: any) => {
    Comment.create(arg).save().then((result: Comment) => {
      send(event, 'post/comment', result);
    }).catch(e => {
      logException(e);
      send(event, 'post/comment', 0);
    });
  });

  on('delete/comment', (event: any, arg: any) => {
    const instance = Comment.create(arg);
    const _id = instance.id;
    instance.remove().then(() => {
      send(event, 'delete/comment', { deleted: true, id: _id });
    }).catch(e => {
      logException(e);
      send(event, 'delete/comment', { deleted: false, id: -1 });
    });
  });


}
