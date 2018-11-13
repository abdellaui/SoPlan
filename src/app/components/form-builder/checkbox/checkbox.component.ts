import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CheckBox } from '@models/formBuilder.class';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  @Input() element: CheckBox;
  @Input() value: any;
  @Input() error: boolean;
  @Output() valueChanged: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  emitChange(): void {
    this.value = !this.value;
    this.valueChanged.emit(this.value);
  }
}
