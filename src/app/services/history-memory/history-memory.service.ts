import { Location as AngularLocation } from '@angular/common';
import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HistoryMemoryService {
  private heightOfStateTree = 0;
  private distanceToCurrentStatePoint = 0;
  private goBackwards = false;
  public enabledBack = true;
  constructor(private router: Router, private location: AngularLocation) {

    // listet router changes
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationStart)
      )
      .subscribe((event: NavigationStart) => {

        // direkter klick auf ein link
        if (event.navigationTrigger === 'imperative') {
          this.enabledBack = true;
          this.distanceToCurrentStatePoint = 0;
          this.heightOfStateTree++; // nach vorne gegangen
        } else if (event.navigationTrigger === 'popstate') {
          // falls link von stack geholt wird und man zurück gegangen ist
          if (this.goBackwards) {
            this.heightOfStateTree--;
            this.distanceToCurrentStatePoint++;
          } else {
            this.distanceToCurrentStatePoint--;
          }

        }

      });

  }
  /**
   * prüft und gibt an ob man nach vorne navigieren kann
   */
  public getForwardState(): boolean {
    return this.distanceToCurrentStatePoint > 0;
  }

  /**
   * navigiert nach vorne
   */
  public goForward(): void {
    if (!this.getForwardState()) {
      return;
    }

    this.goBackwards = false;
    this.location.forward();
  }

  /**
   * prüft und gibt an ob man nach hinten navigieren kann
   */
  public getBackwardState(): boolean {
    return this.heightOfStateTree > 0 && this.enabledBack;
  }

  /**
   * navigiert nach hinten
   */
  public goBackward(): void {
    if (!this.getBackwardState()) {
      return;
    }
    this.goBackwards = true;
    this.location.back();
  }
}
