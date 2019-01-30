import { Component, OnInit, ViewChild } from '@angular/core';
import { Event } from '@entity/event/event.entity';
import { I18n } from '@models/translation/i18n.class';
import { NbSidebarService } from '@nebular/theme';
import { CurrentEventService } from '@services/current-event/current-event.service';
import { HistoryMemoryService } from '@services/history-memory/history-memory.service';
import { ElectronService } from 'ngx-electron';


@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.scss']
})
export class LoggedComponent implements OnInit {
  public _i18n = I18n;

  items: Event[];
  currentItem: Event;
  defaultEvent = <Event>{ name: I18n.resolve('logged_component_no_event'), hosting: { name: I18n.resolve('logged_component_click') } };
  language: string;
  languages = { de: 'Deutsch', en: 'Englisch' };
  languagesKey = Object.keys(this.languages);

  currentSidemenuState = false;
  constructor(
    private sidebarService: NbSidebarService,
    private currentEventsService: CurrentEventService,
    private historyMemory: HistoryMemoryService,
    private electron: ElectronService
  ) {

    this.updateItems();

    this.currentEventsService.newEvents.subscribe(() => {
      this.updateItems();
    });

  }
  ngOnInit() {
    this.language = localStorage.getItem('lang') || 'de';
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

  public toggleRight(): void {
    this.sidebarService.collapse('lang');
    this.sidebarService.toggle(false, 'right');
  }
  public toggleLang(): void {
    this.sidebarService.collapse('right');
    this.sidebarService.toggle(false, 'lang');
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

  public onChangeLanguage(lang: string): void {
    localStorage.setItem('lang', lang);
    this.language = lang;
    const remote = (this.electron && this.electron.remote) ? this.electron.remote : null;
    if (remote && remote.dialog.showMessageBox(remote.getCurrentWindow(), {
      type: 'question',
      buttons: [I18n.resolve('confirm_yes'), I18n.resolve('confirm_no')],
      title: I18n.resolve('confirm_title'),
      message: I18n.resolve('confirm_language_change')
    }) === 0) {
      window.location.reload();
    }
  }

  hoverSideMenu(enter: boolean): void {
    if (enter && !this.currentSidemenuState) {
      this.sidebarService.toggle(true, 'left');
      this.currentSidemenuState = true;
    } else if (this.currentSidemenuState) {
      this.currentSidemenuState = false;
      setTimeout(() => {
        this.sidebarService.toggle(true, 'left');
      }, 200);

    }
  }
}
