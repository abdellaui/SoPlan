import { ipcMain } from 'electron';


let expressServer: any = null;
export function setExpressServer(app: any): any {
    expressServer = app;
}


export function on(channel: string, callback: Function): any {

    if (expressServer) {
        return expressServer.post('/' + channel, (req: any, res: any) => {
            callback(res, req.body);
        });
    } else {
        return ipcMain.on(channel, callback);
    }
}

export function send(event: any, channel: string, args?: Object): any {
    if (expressServer) {
        return event.send({ target: channel, value: args });
    } else {
        return event.sender.send(channel, args);
    }
}
