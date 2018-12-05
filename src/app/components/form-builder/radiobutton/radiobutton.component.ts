import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RadioButton } from '@models/formBuilder.class';

@Component({
  selector: 'app-radiobutton',
  templateUrl: './radiobutton.component.html',
  styleUrls: ['./radiobutton.component.scss']
})
export class RadiobuttonComponent implements OnInit {

  @Input() element: RadioButton;
  @Input() value: any;
  @Input() error: boolean;
  @Output() valueChanged: EventEmitter<any> = new EventEmitter();
  public uniqueName: string;
  constructor() {
    this.uniqueName = Math.random().toString() + '_' + new Date().getTime().toString() + '_' + Math.random().toString();
  }

  ngOnInit() {
  }

  emitChange(event: any): void {
    this.valueChanged.emit(event);
  }

}
