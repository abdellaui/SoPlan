import { Component, OnInit } from '@angular/core';
import { Event } from '@entity/event/event.entity';
import { NbSidebarService } from '@nebular/theme';
import { CurrentEventService } from '@services/current-event/current-event.service';
import { HistoryMemoryService } from '@services/history-memory/history-memory.service';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.scss']
})
export class LoggedComponent implements OnInit {
  items: Event[];
  currentItem: Event;
  defaultEvent = <Event>{ name: 'Keine Veranstaltung gewählt', hosting: { name: 'Hier klicken um eine Veranstaltung zu wählen' } };
  constructor(
    private sidebarService: NbSidebarService,
    private currentEventsService: CurrentEventService,
    private historyMemory: HistoryMemoryService) {

    this.updateItems();

    this.currentEventsService.newEvents.subscribe(() => {
      this.updateItems();
    });

  }

  updateItems(): void {
    this.items = this.currentEventsService.getEvents();

    this.setCurrentEvent(this.currentEventsService.getEvent(), true);

  }

  setCurrentEvent(event: Event, initial?: boolean): void {
    if (event) {
      this.currentItem = event;
    } else {
      this.currentItem = this.defaultEvent;
    }
    if (!initial) {
      this.currentEventsService.setEvent(this.currentItem);
      // setTimeout(() => this.toggleRight(), 500);

    }
  }
  ngOnInit() {

  }

  public toggleLeft(): boolean {
    this.sidebarService.toggle(true, 'left');
    return false;
  }
  public toggleRight(): boolean {
    this.sidebarService.toggle(false, 'right');
    return false;
  }

  public canNotGoForward(): boolean {
    return !this.historyMemory.getForwardState();
  }
  public goHistoryForward(): void {
    this.historyMemory.goForward();
  }

  public canNotGoBackward(): boolean {
    return !this.historyMemory.getBackwardState();
  }
  public goHistoryBackward(): void {
    this.historyMemory.goBackward();
  }
}
