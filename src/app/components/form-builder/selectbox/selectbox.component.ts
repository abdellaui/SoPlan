import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectBox } from '@models/formBuilder.class';

@Component({
  selector: 'app-selectbox',
  templateUrl: './selectbox.component.html',
  styleUrls: ['./selectbox.component.scss']
})
export class SelectboxComponent implements OnInit {
  @Input() element: SelectBox;
  @Input() value: any;
  @Input() error: boolean;
  @Output() valueChanged: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  emitChange(): void {
    this.valueChanged.emit(this.value);
  }
}
