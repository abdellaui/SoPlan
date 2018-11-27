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

  constructor(private router: Router, private location: AngularLocation) {

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationStart)
      )
      .subscribe((event: NavigationStart) => {

        // direkter klick auf ein link
        if (event.navigationTrigger === 'imperative') {
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

  public getForwardState(): boolean {
    return this.distanceToCurrentStatePoint > 0;
  }

  public goForward(): void {
    if (!this.getForwardState()) {
      return;
    }

    this.goBackwards = false;
    this.location.forward();
  }
  public getBackwardState(): boolean {
    return this.heightOfStateTree > 0;
  }

  public goBackward(): void {
    if (!this.getBackwardState()) {
      return;
    }
    this.goBackwards = true;
    this.location.back();
  }
}
