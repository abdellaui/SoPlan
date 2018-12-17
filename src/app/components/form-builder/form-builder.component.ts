import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilderSettings } from '@models/componentInput.class';
import { FormElement } from '@models/formBuilder.class';
import { validate, ValidationError } from 'class-validator';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit, OnChanges {
  @Input() write: any;
  @Input() schema: FormElement[];
  @Input() settings: FormBuilderSettings;

  @Output() finished: EventEmitter<any> = new EventEmitter();
  @Output() saveButtonClicked: EventEmitter<any> = new EventEmitter();
  errorHistory: Object = {};
  errorLookupTable: Object = {};

  constructor() {
  }

  ngOnChanges() {
    this.ngOnInit();
  }

  ngOnInit() {
    this.settings.buttonText = (this.settings.buttonText) ? this.settings.buttonText : 'speichern';
    // default grids (look @ bootstrap)
    this.settings.paddings = (this.settings.paddings) ? this.settings.paddings : { left: 'md-4', right: 'md-8' };

    this.clearErrors();
    this.check();
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
   * Speichert die Fehler in interne Lookup-Tables etc. um im HTML darauf zu reagieren
   * @param errors enthält die Errors
   * @param member begrenzt die Fehlerbehandlung auf ein Attribut
   */
  handleErrors(errors: ValidationError[], member?: string): void {

    const currentErros = {};
    for (const error of errors) {
      this.errorHistory[error.property] = Object.values(error.constraints).join(', ');
      currentErros[error.property] = true;
    }

    for (const key of Object.keys(this.errorLookupTable)) {
      if (member && key !== member) {
        continue;
      }
      if (this.settings.initialWarningsIgnore) {
        return;
      }
      this.errorLookupTable[key] = (currentErros[key]) ? true : false;
    }

  }

  /**
   * ändert den Wert des write-Instanzes
   * @param event enthält das neue Wert
   * @param member gibt den Attributnamen
   */
  changeValue(event: any, member: string): void {
    this.settings.initialWarningsIgnore = false;
    this.write[member] = event;
    this.check(member);
  }

  /**
   * prüft auf Validierungskonflikt, falls keine vorhanden, so wird der parent benachrichtigt
   * @param ignore ignoriert die Error anzeige
   * @param member begrenzt die Validierung auf ein bestimmtes Attribut
   */
  check(member?: string): void {
    validate(this.write).then((error: ValidationError[]) => {
      this.errorHistory = {};
      if (error.length > 0) {
        this.handleErrors(error, member);
        this.reportReadyStatus();

      } else {
        this.clearErrors();
        this.reportReadyStatus();
      }
    }).catch(e => console.log(e));

  }


  hasErrors(): boolean {
    return (JSON.stringify(this.errorHistory) === '{}');
  }
  reportReadyStatus(): void {
    this.finished.emit(this.hasErrors());
  }

  save(): void {
    this.saveButtonClicked.emit(true);
  }

}
