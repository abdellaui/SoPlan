import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DatePicker } from '@models/formBuilder.class';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {
  @Input() element: DatePicker;
  @Input() value: any;
  @Input() error: boolean;
  @Output() valueChanged: EventEmitter<any> = new EventEmitter();

  /**
   * optimize dateformat etc. but its still not important
   *  */
  constructor() { }

  ngOnInit() {
  }


  emitChange(): void {
    this.valueChanged.emit(this.value);
  }

  formatDate(date: Date): string {
    let month = '' + (this.value.getMonth() + 1);
    let day = '' + this.value.getDate();
    const year = this.value.getFullYear();

    if (month.length < 2) { month = '0' + month; }
    if (day.length < 2) { day = '0' + day; }

    return [day, month, year].join('.');
  }
}
