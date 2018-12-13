import { Component, OnInit } from '@angular/core';
import { DefaultEditor } from 'ng2-smart-table';

@Component({
  selector: 'app-date-editor',
  templateUrl: './date-editor.component.html',
  styleUrls: ['./date-editor.component.scss']
})
export class DateEditorComponent extends DefaultEditor implements OnInit {

  private value: any = null;
  constructor() {
    super();
  }
  ngOnInit() {
    this.value = new Date(this.cell.getValue());
  }

  onDateSelect(event: any) {
    this.value = event;
  }

  emitChange(): void {
    this.outputToType();

    this.cell.newValue = (this.value && typeof this.value.toISOString === 'function')
      ? this.value.toISOString()
      : this.value;

  }

  outputToType(): void {
    if (!this.value || this.value === '') {
      this.value = null;
    }

    if (!(this.value instanceof Date) && this.value) {
      this.value = new Date(this.value);
    }
  }
}
