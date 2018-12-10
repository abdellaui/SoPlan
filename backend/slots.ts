import { app, dialog, ipcMain, session } from 'electron';


let expressServer: any = null;

/**
 * set global expressServer
 * @param _app should be an instance of express()
 */
export function setExpressServer(_app: any): any {
  expressServer = _app;
}

/**
 * returns true if expressServer is setted
 */
export function isExpressServer(): Boolean {
  return (expressServer) ? true : false;
}

/**
 * Listens on the channel, runs callback on trigger
 * ### it listens allways
 * @param channel adress of request
 * @param callback Function(event: any, args: any) callback listener triggered
 */

export function on(channel: string, callback: Function): any {
  if (isExpressServer()) {
    return expressServer.post('/' + channel, (req: any, res: any) => {
      callback(res, req.body);
    });
  } else {
    return ipcMain.on(channel, callback);
  }
}

/**
 * Response of request
 * @param event send back to the emitter
 * @param channel adress of listener
 * @param args optional arguments
 */
export function send(event: any, channel: string, args?: Object): any {
  if (isExpressServer()) {
    return event.send({ target: channel, value: args });
  } else {
    return event.sender.send(channel, args);
  }
}
/**
 * Empty response of request
 * @param event send back to the emitter
 */
export function end(event: any) {
  if (isExpressServer()) {
    return event.end();
  }
}
/**
 * Handles unexpected errors
 * @param error (Error) includes description
 * @param quiet (Boolean) show error box?
 * @param run (Boolean) quit application?
 */
export function slotException(error: Error, quiet?: boolean, run?: boolean) {
  console.log(error);
  // with deleting localstorage we activate guards
  session.defaultSession.clearStorageData({ storages: ['localstorage'] });

  if (!quiet) {
    const title = error.name;
    const content = error.message;
    dialog.showErrorBox(title, content);
  }
  if (!run) {
    app.quit();
  }
}


/**
 * Should create log files.
 * @param error (any) includes error
 */
export function logException(error: any) {
  console.log(error);
}
