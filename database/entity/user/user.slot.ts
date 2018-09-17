import { User } from './user.entity';
import { on, send } from './../../slots';

export function init() {

    on('entity/user/create', (event: any, arg: any) => {
        const newUser = new User();
        newUser.lastName = 'test';
        newUser.firstName = 'mockbock';
        newUser.age = 12;

        newUser.save();

        send(event, 'entity/user/create', 'ok');
    });

}
