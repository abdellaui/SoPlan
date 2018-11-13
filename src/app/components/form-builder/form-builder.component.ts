import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormElement } from '@models/formBuilder.class';
import { validate, ValidationError } from 'class-validator';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit {
  @Input() write: any;
  @Input() schema: FormElement[];
  @Input() settings: {
    header?: string;
    buttons?: boolean;
    paddings?: { left: string, right: string };
  };

  @Output() finished: EventEmitter<Boolean> = new EventEmitter();
  errorHistory: Object = {};
  errorLookupTable: Object = {};

  constructor() { }

  ngOnInit() {
    // default grids (look @ bootstrap)
    this.settings.paddings = (this.settings.paddings) ? this.settings.paddings : { left: 'md-4', right: 'md-8' };

    this.clearErrors();
  }

  showError(member: string): string {
    return this.errorHistory[member];
  }
  getError(member: string): boolean {
    return this.errorLookupTable[member];
  }

  clearErrors(): void {
    for (const schemata of this.schema) {
      this.errorLookupTable[schemata.member] = false;
    }
  }

  /**
   * TODO: this methods should only show errors on edited inputs
   * needs to forget history
   */
  handleErrors(errors: ValidationError[], member?: string): void {
    this.errorHistory = {};
    for (const error of errors) {
      this.errorHistory[error.property] = Object.values(error.constraints).join(', ');

      if (member && error.property !== member) {
        continue;
      }

      this.errorLookupTable[error.property] = true;
    }
  }

  changeValue(event: any, member: string): void {
    this.write[member] = event;
    this.check(member);
  }

  check(member?: string): void {
    validate(this.write).then((error: ValidationError[]) => {
      if (error.length > 0) {
        this.handleErrors(error, member);
      }
    }).catch(e => console.log(e));

  }

  save(): void {
    this.finished.emit(true);
  }

}
