import { on, send, slotException } from './../../slots';
import { User } from './user.entity';

export function init() {

  on('entity/user/create', (event: any, arg: User[]) => {
    console.log('entity/user/create', arg, typeof arg);
    arg.forEach((element: User) => {
      const curr = User.create(element);
      curr.save().then((user: User) => {
        console.log(user);
      }).catch((e: Error) => {
        slotException(e);
      });
    });
    send(event, 'entity/user/create', arg);
  });

}

