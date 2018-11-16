import { on, send } from '../../slots';
import { Comment } from './comment.entity';

export function init() {

  on('get/comment/all', (event: any, arg: any) => {
    Comment.find().then((result: Comment[]) => {
      send(event, 'get/comment/all', result);
    }).catch(e => {
      send(event, 'get/comment/all', 0);
    });
  });


  on('get/comment/by/id', (event: any, arg: number) => {
    Comment.findOneOrFail(arg).then((result: Comment) => {
      send(event, 'get/comment/by/id', result);
    }).catch(e => {
      send(event, 'get/comment/by/id', 0);
    });
  });


  on('post/comment', (event: any, arg: any) => {
    Comment.create(arg).save().then((result: Comment) => {
      send(event, 'post/comment', result);
    }).catch(e => {
      send(event, 'post/comment', 0);
    });
  });


}
