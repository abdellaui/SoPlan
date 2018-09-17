import { HttpClient } from '@angular/common/http';
import { ElectronService } from 'ngx-electron';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IpcRendererService {
  private mockService: Subject<any>;

  constructor(private electronService: ElectronService, private httpClient: HttpClient) {
    if (this.electronService.isElectronApp) {
      console.log('application runs outside of electron!');
    } else {
      this.mockService = new Subject();
      console.log('application runs on electron!');
    }
  }

  init(channel: string, callback: Function): any {
    this.once(channel, callback);
    this.send(channel);
  }

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

  send(channel: string, args?: Object): any {
    if (this.electronService.isElectronApp) {
      return this.electronService.ipcRenderer.send(channel, args);
    } else {
      this.httpClient.post('http://localhost:3030/' + channel, args,
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

  remove(channel?: string) {
    if (this.electronService.isElectronApp) {
      return this.electronService.ipcRenderer.removeAllListeners(channel);
    }
  }
}
