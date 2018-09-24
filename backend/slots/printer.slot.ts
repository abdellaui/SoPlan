import { webContents } from 'electron';

import { on, send } from './../slots';

export function init() {

  on('get/printer', (event: any, arg: any) => {
    const printer = webContents.getFocusedWebContents();
    const printerNames: string[] = (printer) ? printer.getPrinters().map((x: any) => x.name) : null;
    send(event, 'get/printer', printerNames);
  });

}
