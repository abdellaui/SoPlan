import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location, LocationSchema } from '@entity/_location/location.entity';
import { Person, PersonSchema } from '@entity/person/person.entity';
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

  settings = {
    actions: {
      position: 'right',
      columnTitle: '',
      add: false
    },
    edit: {
      confirmSave: true,
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      confirmDelete: true,
      deleteButtonContent: '<i class="nb-trash"></i>',
    },
  };

  public data: any[] = [];
  // backup
  private idToEntityMap = {};
  // lookup table
  public columnConfig = {};
  public lastClick = new Date();


  // TODO: am besten als input
  public slotSettings = {
    header: 'Personenliste',
    buttonText: 'Neue Person',
    getUrl: 'get/person/all',
    postUrl: 'post/person',
    deleteUrl: 'delete/person',
    editorUrl: '/logged/person/editor/'
  };

  public instanceList = {
    '': new Person(),
    'location': new Location()
  };

  public memberList = [
    {
      prefix: '',
      schema: PersonSchema,
      members: [
        'firstname',
        'gender',
        'birthDate'
      ],
      extendedSettings: {
        gender: {
          width: '10px'
        }
      }
    },
    {
      prefix: 'location@',
      schema: LocationSchema,
      members: ['city']
    }
  ];


  constructor(private ipc: IpcRendererService, private router: Router) {
    this.memberListToConfig();
  }


  memberListToConfig(): void {

    for (const item of this.memberList) {

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

  dataToEntity(column: any): any {
    let returnEntity = this.idToEntityMap[column.id];
    Object.keys(column).forEach(key => {
      returnEntity = Object.assign(returnEntity, this.goInsideData(column, key, key.split('@')));
    });


    // assign to instances
    Object.keys(this.instanceList).forEach(keys => {
      if (keys === '') {
        returnEntity = Object.assign(this.instanceList[keys], returnEntity);
      } else {
        returnEntity[keys] = Object.assign(this.instanceList[keys], returnEntity[keys]);
      }
    });
    return returnEntity;
  }

  goInsideData(data: any, key: string, path: string[]): any {
    const returnEntity = {};
    if (path.length === 1) {
      returnEntity[path[0]] = data[key];
    } else {
      returnEntity[path[0]] = this.goInsideData(data, key, path.slice(1));
    }
    return returnEntity;
  }

  goInsideEntity(entity: any, path: string[]): any {
    const currentData = entity[path[0]];
    if (path.length === 1) {
      return currentData;
    } else {
      return this.goInsideEntity(currentData, path.slice(1));
    }
  }




  public onDeleteConfirm(event) {
    if (window.confirm('Sind sie sicher?')) {
      this.ipc.get(this.slotSettings.deleteUrl, this.dataToEntity(event.data)).then((result: number) => {
        if (result === 1) {
          event.confirm.resolve();
        } else {
          event.confirm.reject();
        }
      });
    } else {
      event.confirm.reject();
    }
  }

  public onSaveConfirm(event) {
    const newEntity = this.dataToEntity(event.newData);
    console.log(newEntity);
    validate(newEntity).then((errors: ValidationError[]) => {
      if (errors.length === 0) {
        this.saveEntity(newEntity);
        event.confirm.resolve();
      } else {
        window.alert(JSON.stringify(errors)); // TODO: validierung besser anzeigen
        event.confirm.reject();
      }
    });


  }

  saveEntity(entity: any): void {
    this.ipc.send(this.slotSettings.postUrl, entity);
  }
  onMouseOver(event: any): void {
    console.log(event);
  }
  onSelectRow(event: any): void {
    // console.log(event); // TODO: selection eventuell merken?

    if (!event.isSelected && ((new Date()).getTime() - this.lastClick.getTime()) < 500) { // doppelt klick
      this.router.navigateByUrl(this.slotSettings.editorUrl + String(event.data.id));
    } else {
      this.lastClick = new Date();
    }
  }
  ngOnInit() {
    this.ipc.get(this.slotSettings.getUrl).then((result: any) => {
      if (result !== 0) {
        this.data = result.map(obj => {
          return this.entityToData(obj);
        });
        this.dataToEntity(this.data[0]);
      }
    });
  }

}
