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
    console.log(this.value);
    this.valueChanged.emit(this.value);
  }

}
