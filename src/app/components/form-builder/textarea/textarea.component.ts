import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TextArea } from '@models/formBuilder.class';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit {

  @Input() element: TextArea;
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
  }

}
