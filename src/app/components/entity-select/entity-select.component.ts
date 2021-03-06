import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EntitySelectOption, EntitySelectSettings } from '@models/componentInput.class';
import { ErrorRequest } from '@models/errorRequest.class';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { I18n } from '@models/translation/i18n.class';

@Component({
  selector: 'app-entity-select',
  templateUrl: './entity-select.component.html',
  styleUrls: ['./entity-select.component.scss'],
})
export class EntitySelectComponent implements OnInit {
  @Input() selectedIds: number[];
  @Input() settings: EntitySelectSettings;
  @Input() hasError: boolean;
  @Input() readonly: boolean;
  @Output() selected: EventEmitter<number[]> = new EventEmitter();

  public initialized = false;
  public inputValue: string;
  public backUpElements: any[];
  public elements: EntitySelectOption[] = [];
  public selectedElements: EntitySelectOption[] = [];
  public _i18n = I18n; // for accessing in html

  constructor(private ipc: IpcRendererService) { }

  ngOnInit() {
    // defaults for optional arguments
    this.selectedIds = (this.selectedIds) ? this.selectedIds : [];
    this.settings.listTitleMembers = (this.settings.listTitleMembers) ? this.settings.listTitleMembers : [];
    this.settings.maxSelection = (this.settings.maxSelection) ? this.settings.maxSelection : 1;
    this.settings.seperatorName = (this.settings.seperatorName) ? this.settings.seperatorName : ' ';
    this.settings.seperatorTitle = (this.settings.seperatorTitle) ? this.settings.seperatorTitle : ' - ';

    this.settings.editorUrl = (this.settings.editorUrl)
      ? this.settings.editorUrl
      : '';

    this.settings.showCreateButton = (this.settings.showCreateButton)
      ? this.settings.showCreateButton
      : false;

    this.settings.createButtonText = (this.settings.createButtonText)
      ? this.settings.createButtonText
      : this.settings.header + I18n.resolve('button_add');

    this.getElements();
  }


  public getElements(): void {
    if (this.settings.getUrl) {
      this.ipc.get(this.settings.getUrl, this.settings.getParams).then((result: any) => {
        if (!ErrorRequest.hasError(result)) {
          this.backUpElements = <any[]>result || [];
          this.transferToListItem(this.backUpElements);
          this.selectSelectedIds();
        }
      });
    }
  }

  public extractInformation(element: any, props: any): (string | number)[] {
    let returnArray = [];
    for (const texts of props) {

      if (texts instanceof Object) {
        const key = Object.keys(texts)[0];
        const searchProps: string[] = texts[key];
        returnArray = returnArray.concat(this.extractInformation(element[key], searchProps));
      } else {
        const currentElement = element[texts];
        returnArray.push(currentElement);
      }
    }
    return returnArray;
  }

  private transferToListItem(instances: any[]): void {
    this.elements = instances.map(element => {
      const nameArray = this.extractInformation(element, this.settings.listNameMembers);
      const titleArray = this.extractInformation(element, this.settings.listTitleMembers);
      const showName = nameArray.join(this.settings.seperatorName);
      const showTitle = titleArray.join(this.settings.seperatorTitle);
      return <EntitySelectOption>{ id: element.id, name: showName, title: showTitle };
    });
  }

  public selectSelectedIds(): void {
    this.elements
      .filter(el => (this.selectedIds.indexOf(el.id) > -1))
      .forEach(el => this.select(el));
    this.initialized = true;
  }

  public getIndexOfId(element: any): number {
    return this.selectedElements.indexOf(element);
  }


  // for html
  public containsId(element: any): boolean {
    return (this.getIndexOfId(element) > -1);
  }


  search() {
    /**
     * TODO: better search engine
     */
    this.transferToListItem(
      this.backUpElements.filter(element => {
        return this.extractInformation(element, this.settings.listNameMembers)
          .concat(
            this.extractInformation(element, this.settings.listTitleMembers)
          )
          .join('').toLowerCase().includes(this.inputValue.toLowerCase());
      })
    );

  }

  select(element: any): void {
    if (this.readonly && this.initialized) { return; }
    const possibleIndex = this.getIndexOfId(element);
    // doubleclick => remove
    if (possibleIndex > -1) {
      // entferne
      this.selectedElements.splice(possibleIndex, 1);
    } else {

      // falls max. anzahl gewählte wurde pop(), quasi letzer wird ersetz
      if (this.selectedElements.length >= this.settings.maxSelection) {
        this.selectedElements.pop();
      }
      this.selectedElements.push(element);
    }
    this.emitSelect();
  }

  emitSelect(): void {
    this.selected.emit(this.selectedElements.map(el => el.id));
  }
}
