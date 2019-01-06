import { Component, OnInit } from '@angular/core';
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
  items: Event[];
  currentItem: Event;

  defaultEvent = <Event>{ name: I18n.resolve('logged_component_no_event'), hosting: { name: I18n.resolve('logged_component_click') } };
  language: string;
  languages = { de: 'Deutsch', en: 'Englisch' };
  languagesKey = Object.keys(this.languages);
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
    this.language = localStorage.getItem('lang') || 'de';
  }

  public toggleLeft(): boolean {
    this.sidebarService.toggle(true, 'left');
    return false;
  }
  public toggleRight(): boolean {
    this.sidebarService.collapse('lang');
    this.sidebarService.toggle(false, 'right');
    return false;
  }
  public toggleLang(): boolean {
    this.sidebarService.collapse('right');
    this.sidebarService.toggle(false, 'lang');
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
}
