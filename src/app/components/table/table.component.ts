import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SmartTableConfig } from '@models/componentInput.class';
import { ErrorRequest } from '@models/errorRequest.class';
import { ElementTypes, Option, RadioButton } from '@models/formBuilder.class';
import { I18n } from '@models/translation/i18n.class';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { validate, ValidationError } from 'class-validator';
import * as Deepmerge from 'deepmerge';
import { LocalDataSource } from 'ng2-smart-table';
import { ElectronService } from 'ngx-electron';
import { ToastrService } from 'ngx-toastr';

import { DateEditorComponent } from './date-editor/date-editor.component';
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
      editButtonContent: '<i class="nb-edit" title="' + I18n.resolve('table_edit') + '"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      confirmDelete: true,
      deleteButtonContent: '<i class="nb-trash" title="' + I18n.resolve('table_delete') + '"></i>',
    },
    noDataMessage: I18n.resolve('table_no_data_warning'),
    pager: {
      display: false  // sonst wählt multi select by all nur die jenigen die auf der seite zusehen sind
    }
  };

  public _i18n = I18n;
  public data: LocalDataSource; // angezeigte daten
  private idToEntityMap = {}; // um nicht angezeigte Daten nicht zu verwerfen
  public columnConfig = {}; // transformations gedächnis
  public selectedData: any[] = []; // zwischenspeicher für auswahl
  public rememberIdOfDeleteError: number[] = [];
  public deletedCount = 0;
  public uniqueName;
  @Output() action: EventEmitter<any> = new EventEmitter();
  @Output() dataChanged: EventEmitter<any> = new EventEmitter();
  @Input() config: SmartTableConfig;



  constructor(private ipc: IpcRendererService, private router: Router, private toastr: ToastrService, private electron: ElectronService) {
    this.data = new LocalDataSource();
    this.uniqueName = 'st_' + new Date().getTime().toString();
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
          title: '<i class="nb-compose" title="' + I18n.resolve('table_edit_advanced') + '"></i> ',
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
      : I18n.resolve('table_add');
    // end defaults


    this.settings.actions['custom'] = this.config.customListAction;

    this.memberListToConfig();

    // get data
    this.ipc.get(this.config.slotUrls.getUrl, this.config.slotUrls.getParam).then((result: any) => {
      if (!ErrorRequest.hasError(result)) { // result.error has the error
        this.data.load(result.map(obj => {
          return this.entityToData(obj);
        })).then(() => {
          this.loadedFirstTime = true;
        });
      }
    });

    this.ipc.on(this.config.slotUrls.deleteUrl, (event: any, arg: { deleted: boolean, id: number }) => {
      this.deletedCount--;
      if (arg.deleted === false) {
        this.rememberIdOfDeleteError.push(arg.id);
      } else {
        this.data.getAll().then((dataArray: any[]) => {
          const data = dataArray.find(x => x.id === arg.id);
          if (data !== undefined) {
            this.data.remove(data).then(() => {
              this.dataChanged.emit();
            }).catch(e => console.log(e));
          }
        });
      }
      if (!this.deletedCount) {
        this.showDeleteErrorToastr();
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
                true: I18n.resolve('table_yes'),
                false: I18n.resolve('table_no'),
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
              currEditorConfig['type'] = 'custom';
              currEditorConfig['component'] = DateEditorComponent;

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
   * die smart table datenstruktur wird dem ursprünglichem entität struktur zugewiesen
   * @param column enthält die smart table datenstruktur
   */
  dataToEntity(column: any): any {

    let returnEntity = this.idToEntityMap[column.id];

    const recreateObject = {};
    Object.keys(column).forEach(key => {
      Object.assign(recreateObject, this.goInsideData(column, key, key.split('@')));
    });

    returnEntity = Deepmerge(returnEntity, recreateObject);

    Object.keys(this.config.instanceMap).forEach(keys => {
      const generate = Object.setPrototypeOf({}, this.config.instanceMap[keys]);
      if (keys === '') {
        returnEntity = Object.assign(generate, returnEntity);
      } else {
        returnEntity[keys] = Object.assign(generate, returnEntity[keys]);
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
      returnEntity[path[0]] = Number(data[key]) || data[key] || null; // fixes validators
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
    const remote = (this.electron && this.electron.remote) ? this.electron.remote : null;
    if (remote && remote.dialog.showMessageBox(remote.getCurrentWindow(), {
      type: 'question',
      buttons: [I18n.resolve('confirm_yes'), I18n.resolve('confirm_no')],
      title: I18n.resolve('confirm_title'),
      message: I18n.resolve('table_delete_entry')
    }) === 0 && !this.deletedCount) {
      this.deletedCount = 1;
      this.clearDeleteErrors();
      this.ipc.send(this.config.slotUrls.deleteUrl, this.dataToEntity(event.data));
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
        this.handleErrors(errors, event.newData.id);
        event.confirm.reject();
      }
    });


  }

  /**
   * iteriert durch die ValidationError Array und makiert betroffene Felder rot ein!
   * vorab werden alle Makierungen entfernt!
   * @param errors  ValidationError[]
   */
  handleErrors(errors: ValidationError[], id: number): void {
    this.data.getAll().then((data: any[]) => {
      let index = data.findIndex(x => x.id === id);
      if (index > -1) {
        index = index + 1;
        // entferne alte
        const elements = document
          .querySelectorAll(`ng2-smart-table#${this.uniqueName} tr:nth-child(${index}) .validationErrorBorder`);

        for (let i = 0; i < elements.length; ++i) {
          elements[i].classList.remove('validationErrorBorder');
        }


        this.renderErrors(errors, index, '');
      }
    });
  }

  renderErrors(errors: ValidationError[], tr_index: number, prefix: string): void {
    for (const error of errors) {
      if (error.children.length) {
        this.renderErrors(error.children, tr_index, error.property + '@');
      } else {
        const indexOfColumn = Object.keys(this.columnConfig).findIndex(x => x === prefix + error.property);
        if (indexOfColumn > -1) {
          document
            .querySelector(`ng2-smart-table#${this.uniqueName} tr:nth-child(${tr_index})
            td:nth-child(${indexOfColumn + 2}) table-cell-edit-mode > * > * > * > * > *`)
            .classList.add('validationErrorBorder');
        }
      }

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
    this.ipc.get(this.config.slotUrls.postUrl, entity).then(() => {
      this.dataChanged.emit();
    });
  }


  deleteAllSelected(): void {
    const remote = (this.electron && this.electron.remote) ? this.electron.remote : null;
    if (remote && remote.dialog.showMessageBox(remote.getCurrentWindow(), {
      type: 'question',
      buttons: [I18n.resolve('confirm_yes'), I18n.resolve('confirm_no')],
      title: I18n.resolve('confirm_title'),
      message: I18n.resolve('confirm_delete_entries')
    }) === 0 && !this.deletedCount) {
      this.deletedCount = this.selectedData.length;
      this.clearDeleteErrors();
      for (const data of this.selectedData) {
        this.ipc.send(this.config.slotUrls.deleteUrl, this.dataToEntity(data));
      }
    }
  }

  clearDeleteErrors(): void {
    this.rememberIdOfDeleteError = [];
    const rowsOfTable = document.querySelectorAll(`ng2-smart-table#${this.uniqueName} tr`);
    for (let i = 0; i < rowsOfTable.length; ++i) {
      rowsOfTable[i].classList.remove('validationErrorBorder');
    }
  }

  handleDeleteError(indexOfData: number): void {

    const rowsOfTable = document.querySelectorAll(`ng2-smart-table#${this.uniqueName} tr`);
    rowsOfTable[indexOfData].classList.add('validationErrorBorder');
  }

  showDeleteErrorToastr(): void {

    if (this.rememberIdOfDeleteError.length) {
      this.data.getAll().then((dataArray: any[]) => {
        this.rememberIdOfDeleteError.forEach((id: number) => {
          const indexFromId = dataArray.findIndex(x => x.id === id);
          if (indexFromId > -1) {
            this.handleDeleteError(indexFromId + 2);
          }
        });
      });
      this.toastr.error(I18n.resolve('toastr_red_boxed_entries_cannot_be_deleted'));
    }
  }
  /**
   * wird ausgelöst falls ein custom action auf einer zeile ausgeführt wird (edit&delete sind ausgeschlossen)
   * @param event {action:string, data:any} enthält action name und die daten der zeile
   */
  onCustomActionListClicked(event: any) {
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
    this.action.emit({
      action: name, data: this.selectedData.map(
        (el: any) => {
          return this.dataToEntity(el);
        })
    });
  }


}
