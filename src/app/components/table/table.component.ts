import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SmartTableConfig } from '@models/componentInput.class';
import { ElementTypes, Option, RadioButton } from '@models/formBuilder.class';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { validate, ValidationError } from 'class-validator';

import { DateRendererComponent } from './date-renderer/date-renderer.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {
  loadedFirstTime = false;
  settings = {
    selectMode: 'multi',
    actions: {
      position: 'right',
      columnTitle: '',
      add: false
    },
    edit: {
      confirmSave: true,
      editButtonContent: '<i class="nb-edit" title="Bearbeiten"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      confirmDelete: true,
      deleteButtonContent: '<i class="nb-trash" title="Löschen"></i>',
    },
    noDataMessage: 'Keine Daten vorhanden!',
    pager: {
      display: false  // sonst wählt multi select by all nur die jenigen die auf der seite zusehen sind
    }
  };

  public data: any[] = []; // angezeigte daten
  private idToEntityMap = {}; // um nicht angezeigte Daten nicht zu verwerfen
  public columnConfig = {}; // transformations gedächnis
  public selectedData: any[] = []; // zwischenspeicher für auswahl

  @Output() action: EventEmitter<any> = new EventEmitter();
  @Output() dataChanged: EventEmitter<any> = new EventEmitter();
  @Input() config: SmartTableConfig;



  constructor(private ipc: IpcRendererService, private router: Router) {
  }

  ngOnInit() {
    // defaults
    this.config.customActions = (this.config.customActions)
      ? this.config.customActions
      : [];


    // default custom list action is go to editor with instance id
    this.config.customListAction = (this.config.customListAction)
      ? this.config.customListAction
      : [
        {
          name: 'gotoEditor',
          title: '<i class="nb-compose" title="Erweiterte Bearbeitung"></i> ',
        },
      ];

    this.config.slotUrls.editorUrl = (this.config.slotUrls.editorUrl)
      ? this.config.slotUrls.editorUrl
      : '';

    this.config.memberList = (this.config.memberList)
      ? this.config.memberList
      : [];

    this.config.settings.showCreateButton = (this.config.settings.showCreateButton)
      ? this.config.settings.showCreateButton
      : true;

    this.config.settings.createButtonText = (this.config.settings.createButtonText)
      ? this.config.settings.createButtonText
      : 'hinzufügen';
    // end defaults


    this.settings.actions['custom'] = this.config.customListAction;

    this.memberListToConfig();

    // get data
    this.ipc.get(this.config.slotUrls.getUrl, this.config.slotUrls.getParam).then((result: any) => {
      if (result !== 0) {
        this.data = result.map(obj => {
          return this.entityToData(obj);
        });

        this.loadedFirstTime = true;
      }
    });


  }

  /**
   * Erzeugt aus der übergebenen memberlist schema eine für smarttable angemessene Struktur
   * merkt sich die transformation um enitäten mit dieser transformation in angemessene datenstrukturen
   * umzuwandeln
   */
  memberListToConfig(): void {

    for (const item of this.config.memberList) {

      for (const formElement of item.schema) {
        if (item.members.indexOf(formElement.member) > -1) {
          const currConfig = (item.extendedSettings && item.extendedSettings[formElement.member])
            ? item.extendedSettings[formElement.member]
            : {};

          const currEditorConfig = {};
          currConfig['title'] = formElement.name;
          currConfig['editable'] = (currConfig.editable !== undefined) ? currConfig.editable : !formElement.element.isReadOnly();
          switch (formElement.element.getElementType()) {
            case ElementTypes.CheckBox:
              currEditorConfig['type'] = 'checkbox';
              currEditorConfig['config'] = {
                true: 'Ja',
                false: 'Nein',
              };
              break;
            case ElementTypes.SelectBox:
            case ElementTypes.RadioButton:
              const element = <RadioButton>formElement.element;
              currEditorConfig['type'] = 'list';
              currEditorConfig['config'] = {
                list: element.getOptions().map((el: Option) => {
                  return { value: el.value, title: el.label };
                })
              };
              break;

            case ElementTypes.TextArea:
              currEditorConfig['type'] = 'textarea';
              break;

            case ElementTypes.DatePicker:
              currConfig['type'] = 'custom';
              currConfig['renderComponent'] = DateRendererComponent;
              break;

            default:
              break;

          }
          currConfig['editor'] = currEditorConfig;

          this.columnConfig[`${item.prefix}${formElement.member}`] = currConfig;

        }
      }
    }
    this.settings['columns'] = this.columnConfig;
  }

  /**
   * die entität wird der smart table angemessenen datenstruktur transformiert
   * @param data enthält eine instance eines entitäten
   */
  entityToData(data: any): any {
    if (data && data.id) {
      this.idToEntityMap[data.id] = data;
    }

    const returnData = {};
    returnData['id'] = this.goInsideEntity(data, ['id']);
    Object.keys(this.columnConfig).forEach(column => {
      returnData[column] = this.goInsideEntity(data, column.split('@'));
    });
    return returnData;
  }

  /**
   * die smart table datenstruktur wird dem ursprünglichem entät struktur zugewiesen
   * @param column enthält die smart table datenstruktur
   */
  dataToEntity(column: any): any {
    let returnEntity = this.idToEntityMap[column.id];
    Object.keys(column).forEach(key => {
      returnEntity = Object.assign(returnEntity, this.goInsideData(column, key, key.split('@')));
    });


    // assign to instances
    Object.keys(this.config.instanceMap).forEach(keys => {
      if (keys === '') {
        returnEntity = Object.assign(this.config.instanceMap[keys], returnEntity);
      } else {
        returnEntity[keys] = Object.assign(this.config.instanceMap[keys], returnEntity[keys]);
      }
    });
    return returnEntity;
  }

  /**
   * arbeitet rekrusiv sich durch die datenstruktur um die gewünschte entität struktur wiederherzustellen
   * @param data die gesamte datenstruktur
   * @param key der aktuelle key
   * @param path der pfad zum wert
   */
  goInsideData(data: any, key: string, path: string[]): any {
    const returnEntity = {};
    if (path.length === 1) {
      returnEntity[path[0]] = data[key];
    } else {
      returnEntity[path[0]] = this.goInsideData(data, key, path.slice(1));
    }
    return returnEntity;
  }

  /**
   * die entität wird rekrusiv abgetastet und eine der smart table angemessene datenstruktur übertragen
   * @param entity vollständige entität
   * @param path der pfad vom member
   */
  goInsideEntity(entity: any, path: string[]): any {
    const currentData = entity[path[0]] || null;
    if (path.length === 1 || currentData === null) {
      return currentData;
    } else {
      return this.goInsideEntity(currentData, path.slice(1));
    }
  }

  /**
   * löschen eines eintrags
   * @param event enthält die zu löschende data
   */
  onDeleteConfirm(event: any) {
    if (window.confirm('Sie versuchen ein Eintrag zu löschen!')) {
      this.ipc.get(this.config.slotUrls.deleteUrl, this.dataToEntity(event.data)).then((result: number) => {
        if (result === 1) {
          this.dataChanged.emit();
          event.confirm.resolve();
        } else {
          event.confirm.reject();
        }
      });
    } else {
      event.confirm.reject();
    }
  }

  /**
   * bei Speichern eines änderunges
   * @event enhält im newData Attribut die Änderung
   */
  onSaveConfirm(event: any) {
    const newEntity = this.dataToEntity(event.newData);
    validate(newEntity).then((errors: ValidationError[]) => {
      if (errors.length === 0) {
        this.saveEntity(newEntity);
        event.confirm.resolve();
      } else {
        this.handleErrors(errors);
        event.confirm.reject();
      }
    });


  }

  /**
   * iteriert durch die ValidationError Array und makiert betroffene Felder rot ein!
   * vorab werden alle Makierungen entfernt!
   * @param errors  ValidationError[]
   */
  handleErrors(errors: ValidationError[]): void {

    // entferne alte
    const elements = document.querySelectorAll('.validationErrorBorder');

    for (let i = 0; i < elements.length; ++i) {
      elements[i].classList.remove('validationErrorBorder');
    }


    for (const error of errors) {
      document.querySelector(`[ng-reflect-name="${error.property}"]`).classList.add('validationErrorBorder');
    }
  }

  /**
   * bei Auswahl von eine oder mehrere Zeilen
   * Auswahl wird intern abgespeichert
   */
  onSelectRow(event: any): void {
    this.selectedData = event.selected;
  }

  saveEntity(entity: any): void {
    this.ipc.get(this.config.slotUrls.postUrl, entity).then(r => {
      this.dataChanged.emit();
    });
  }


  deleteAllSelected(): void {

    if (window.confirm(`Sie versuchen ${this.selectedData.length} Einträge zu löschen!`)) {
      for (const data of this.selectedData) {
        this.ipc.get(this.config.slotUrls.deleteUrl, this.dataToEntity(data)).then((result: number) => {
          if (result === 0) {
            window.alert(data); // TODO: handle could not delete
          } else {
            this.dataChanged.emit();
          }
        });
      }
    }
  }

  /**
   * wird ausgelöst falls ein custom action auf einer zeiler ausgeführt wird (edit&delete sind ausgeschlossen)
   * @param event {action:string, data:any} enthält action name und die daten der zeile
   */
  onCustomActionListClicked(event) {
    if (event.action === 'gotoEditor') {

      this.router.navigateByUrl(this.config.slotUrls.editorUrl + event.data.id);

    } else {
      this.action.emit({ action: event.action, data: [event.data] });
    }
  }
  /**
   * wird ausgelöst wenn actions (oben) ausgelöst werden (delete all & add ausgeschlossen)
   * muss von parent abgefangen werden!
   * @param name entält name des custom actions
   */
  onCustomActionClicked(name: string) {
    this.action.emit({ action: name, data: this.selectedData });
  }


}
