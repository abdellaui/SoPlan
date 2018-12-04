import { Component, OnInit } from '@angular/core';
import { Event } from '@entity/event/event.entity';
import { CurrentEventService } from '@services/current-event/current-event.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private currentEvent: Event = null;
  private showHelp = true;

  constructor(private currentEventService: CurrentEventService) {
    this.currentEventService.currentEventChanged.subscribe((newEvent: Event) => {
      this.setEvent(newEvent);
    });
    this.setEvent(this.currentEventService.getEvent());
  }

  ngOnInit() {
  }

  setEvent(ev: Event): void {
    if (ev !== null) {
      this.currentEvent = ev;
      this.showHelp = false;
    } else {
      this.showHelp = true;

    }
  }
}
