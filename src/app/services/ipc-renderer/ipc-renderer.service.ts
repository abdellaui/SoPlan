import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Subject } from 'rxjs';
import { filter, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IpcRendererService {
  private mockService: Subject<any>;

  constructor(private electronService: ElectronService, private httpClient: HttpClient) {
    if (this.electronService.isElectronApp) {
      this.electronService.ipcRenderer.setMaxListeners(99999);
      console.log('application runs on electron!');
    } else {
      this.mockService = new Subject();
      console.log('application runs outside of electron!');
    }
  }

  /**
   * Returns the result of the request as an Promise.
   * ### This should be used if you only request once
   * @param channel adress of the request
   * @param args optional arguments send by the request
   */

  get<T>(channel: string, args?: Object): Promise<T> {
    return new Promise<T>((resolve: Function) => {
      this.once(channel, (event: any, arg: any) => {
        resolve(arg);
      });
      this.send(channel, args);
    });
  }

  /**
   * Initialize an listener and a request in time.
   * @param channel adress of the request and listener
   * @param callback Function(event: any, args: any) callback listener triggered
   * @param args optional arguments send by the request
   */
  init(channel: string, callback: Function, args?: Object) {
    this.on(channel, callback);
    this.send(channel, args);
  }

  /**
   * Listens on the channel, runs callback on trigger
   * ### it listens allways
   * @param channel adress of the listener
   * @param callback Function(event: any, args: any) callback listener triggered
   */
  on(channel: string, callback: Function): any {
    if (this.electronService.isElectronApp) {
      return this.electronService.ipcRenderer.on(channel, callback);
    } else {

      return this.mockService.pipe(
        filter((x: any) => {
          return x.target === channel;
        })).subscribe((x: any) => {
          callback({ sender: this }, x.value);
        });

    }
  }

  /**
   * Listens on the channel, runs callback on trigger
   * ### it listens only once
   * @param channel adress of the listener
   * @param callback Function(event: any, args: any) callback listener triggered
   */
  once(channel: string, callback: Function): any {
    if (this.electronService.isElectronApp) {
      return this.electronService.ipcRenderer.once(channel, callback);
    } else {

      return this.mockService.pipe(
        first((x: any) => {
          return x.target === channel;
        })).subscribe((x: any) => {
          callback({ sender: this }, x.value);
        });

    }
  }

  /**
   * It send a request to the channel with optional arguments.
   * @param channel adress ot the request
   * @param args optional arguments send by the request
   */
  send(channel: string, args?: Object): any {
    if (this.electronService.isElectronApp) {
      return this.electronService.ipcRenderer.send(channel, args);
    } else {
      return this.httpClient.post('http://localhost:3030/' + channel, args,
        {
          headers: { 'Content-Type': 'application/json' },
          responseType: 'json'
        }
      ).subscribe((data: any) => {
        if (data.target) {
          this.mockService.next(data);
        }
      });
    }
  }

}
