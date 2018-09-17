import * as Settings from 'electron-settings';
import { on, send } from './slots';

export function init() {
    on('get/database/config', (event: any, arg: any) => {
        send(event, 'get/database/config', Settings.get('dbconfig'));
    });

    on('post/database/config', (event: any, arg: any) => {
        console.log(arg);
        // Settings.set('dbconfig', ...arg);
        send(event, 'get/database/config', arg);
    });
}
