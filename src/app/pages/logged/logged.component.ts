import { Component, Inject, OnInit } from '@angular/core';
import { Event } from '@entity/event/event.entity';
import { NB_WINDOW, NbMenuService, NbSidebarService } from '@nebular/theme';
import { CurrentEventService } from '@services/current-event/current-event.service';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.scss']
})
export class LoggedComponent implements OnInit {
  items: Event[];
  currentItem: Event;
  defaultEvent = <Event>{ name: 'keine Veranstaltung', hosting: { name: 'bitte wähle eine Veranstaltung' } };
  constructor(
    private nbMenuService: NbMenuService,
    @Inject(NB_WINDOW) private window,
    private sidebarService: NbSidebarService,
    private currentEventsService: CurrentEventService) {

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
      this.toggleRight();
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
}
