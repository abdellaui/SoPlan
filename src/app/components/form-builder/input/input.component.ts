import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Input as InputField } from '@models/formBuilder.class';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() element: InputField;
  @Input() value: any;
  @Input() error: boolean;
  @Output() valueChanged: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  emitChange(): void {
    this.outputToType();
    this.valueChanged.emit(this.value);
  }

  outputToType(): void {

    if (!this.value || this.value === '') {
      this.value = null;
    }

    if (this.element.getType() === 'number' && this.value) {

      this.value = Number(this.value);

    }
  }
}
