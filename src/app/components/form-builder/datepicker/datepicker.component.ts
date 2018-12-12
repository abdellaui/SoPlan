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

  public shownValue;
  constructor() {
  }

  ngOnInit() {
    this.shownValue = new Date(this.value);
  }

  onDateSelect(event: any) {
    this.shownValue = event;
  }

  emitChange(): void {
    this.outputToType();
    this.value = (typeof this.shownValue.toISOString === 'function')
      ? this.shownValue.toISOString()
      : this.shownValue;
    this.valueChanged.emit(this.value);
  }

  outputToType(): void {
    if (!this.shownValue || this.shownValue === '') {
      this.shownValue = null;
    }
    if (!(this.shownValue instanceof Date) && this.shownValue) {
      this.shownValue = new Date(this.shownValue);
    }
  }
}
