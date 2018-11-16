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

    if (this.currentEventsService.getEvent()) {
      this.currentItem = this.currentEventsService.getEvent();
    } else {
      this.currentItem = <Event>{ name: 'keine Veranstaltung', hosting: { name: 'bitte wähle eine Veranstaltung' } };
    }
  }

  setCurrentEvent(event: Event): void {
    this.currentItem = event;
    this.currentEventsService.setEvent(this.currentItem);
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
