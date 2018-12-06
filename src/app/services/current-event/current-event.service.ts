import { Injectable } from '@angular/core';
import { Event } from '@entity/event/event.entity';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentEventService {

  private currentId = 0;
  public currentEvent: Event = null;
  public currentAviableEvents: Event[] = [];

  public newEvents: Subject<boolean> = new Subject();
  public currentEventChanged: Subject<Event> = new Subject();

  constructor(private ipc: IpcRendererService) {
    this.ipc.on('get/event/all', (event: any, arg: any) => {
      if (arg !== 0) {
        this.currentAviableEvents = <Event[]>arg;
        this.newEvents.next(true);
      }
    });

    this.ipc.on('get/event/by/id', (event: any, arg: any) => {
      if (arg !== 0) {
        this.setEvent(<Event>arg);
      }
    });

    this.ipc.get('get/event/current').then((result: number) => {
      this.currentId = result;
      this.refreshEvents();
    });
  }

  setEvent(event: Event): void {
    this.currentId = (event) ? event.id : 0;
    this.currentEvent = event;
    this.currentEventChanged.next(this.currentEvent);
    this.ipc.send('set/event/current', { id: this.currentId });
  }

  getEvent(): Event {
    return this.currentEvent;
  }

  getEvents(): Event[] {
    return this.currentAviableEvents;
  }

  refreshEvents(): void {
    if (this.currentId > 0) {
      this.ipc.send('get/event/by/id', { id: this.currentId });
    }
    this.ipc.send('get/event/all');
  }
}
