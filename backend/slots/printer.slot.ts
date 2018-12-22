import { webContents } from 'electron';
import * as Settings from 'electron-settings';

import { end, on, send } from './../slots';

export function init() {

  if (!Settings.has('printer')) {
    Settings.set('printer', '');
  }


  on('get/printer', (event: any) => {
    send(event, 'get/printer', Settings.get('printer'));
  });

  on('post/printer', (event: any, config: string) => {
    Settings.set('printer', config);
    end(event);
  });

  on('get/printer/all', (event: any) => {
    const printer = webContents.getFocusedWebContents();
    let returnValue = null;
    if (printer) {
      returnValue = printer.getPrinters().map(x => Object.assign({ id: x.name }, x));
    }
    send(event, 'get/printer/all', returnValue);
  });

}
