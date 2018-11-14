import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EntitySelectOption, EntitySelectSettings } from '@models/componentInput.class';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';

@Component({
  selector: 'app-entity-select',
  templateUrl: './entity-select.component.html',
  styleUrls: ['./entity-select.component.scss']
})
export class EntitySelectComponent implements OnInit {
  @Input() selectedIds: number[];
  @Input() settings: EntitySelectSettings;
  @Output() selected: EventEmitter<number[]> = new EventEmitter();

  public inputValue: string;
  public backUpElements: any[];
  public elements: EntitySelectOption[];
  public selectedElements: EntitySelectOption[] = [];

  constructor(private ipc: IpcRendererService) { }

  ngOnInit() {

    // defaults for optional arguments
    this.selectedIds = (this.selectedIds) ? this.selectedIds : [];
    this.settings.listTitleMembers = (this.settings.listTitleMembers) ? this.settings.listTitleMembers : [];
    this.settings.maxSelection = (this.settings.maxSelection) ? this.settings.maxSelection : 1;
    this.settings.seperatorName = (this.settings.seperatorName) ? this.settings.seperatorName : ' ';
    this.settings.seperatorTitle = (this.settings.seperatorTitle) ? this.settings.seperatorTitle : ' - ';

    this.getElements();
  }


  private getElements(): void {
    if (this.settings.getUrl) {
      this.ipc.get(this.settings.getUrl, this.settings.getParams).then((result: any) => {
        if (result !== 0) {
          this.backUpElements = <any[]>result;
          this.transferToListItem(this.backUpElements);
          this.selectSelectedIds();
        }
      });
    }
  }

  private extractInformation(element: any, props: any): string[] {
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

  private selectSelectedIds(): void {
    this.elements
      .filter(el => (this.selectedIds.indexOf(el.id) > -1))
      .forEach(el => this.select(el));
  }

  private getIndexOfId(element: any): number {
    return this.selectedElements.indexOf(element);
  }

  private containsId(element: any): boolean {
    return (this.getIndexOfId(element) > -1);
  }


  search() {

    this.transferToListItem(
      this.backUpElements.filter(element => {
        return JSON.stringify(element).toLowerCase().includes(this.inputValue.toLowerCase());
      })
    );

  }

  select(element: any): void {
    console.log(element);
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
