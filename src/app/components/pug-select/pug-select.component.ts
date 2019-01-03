import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { EntitySelectComponent } from '@components/entity-select/entity-select.component';
import { EntitySelectSettings } from '@models/componentInput.class';
import { ErrorRequest } from '@models/errorRequest.class';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { ToastrService } from 'ngx-toastr';
import { I18n } from '@models/translation/i18n.class';

@Component({
  selector: 'app-pug-select',
  templateUrl: './pug-select.component.html',
  styleUrls: ['./pug-select.component.scss']
})
export class PugSelectComponent implements OnInit, AfterViewInit {
  @ViewChild('dropArea') dropArea: ElementRef;
  @ViewChild('selection') selection: EntitySelectComponent;
  @Input() data: any[] = [];

  public inlineEdit = false;
  public inlineEditValue = 1;
  public enableFullscreen = true;
  public processCount = 1;
  public loadingBar = 0;
  public currentIndex = 0;
  public maxIndex = 1;
  public showLoading = false;
  public pdfSrc = null;
  public droppedItems: any[] = [];
  public selection_selectedIds: string[] = [];
  public selection_settings: EntitySelectSettings = <EntitySelectSettings>{
    getUrl: 'get/pugfiles',
    listNameMembers: ['name'],
    listTitleMembers: ['created'],
    header: 'Files',
    maxSelection: 1,
    showCreateButton: false
  };
  constructor(public ipc: IpcRendererService, public toastr: ToastrService) { }

  ngOnInit() {

    this.ipc.get('get/printer').then(e => console.log(e));
    this.maxIndex = this.data.length;

    this.ipc.on('put/pdf', () => {
      this.processCount = Math.max(this.processCount + 1, this.maxIndex);
      if (this.processCount === this.maxIndex) {
        this.enableFullscreen = true;
      }
    });
  }



  ngAfterViewInit() {
    const holder = this.dropArea.nativeElement;

    holder.ondragover = () => {
      holder.classList.add('dragOver');
      return false;
    };

    holder.ondragleave = () => {
      this.clearDragArea();
      return false;
    };

    holder.ondragend = () => {
      return false;
    };

    holder.ondrop = (e: any) => {
      e.preventDefault();
      this.clearDragArea();

      if (e.dataTransfer) {
        this.processFiles(e.dataTransfer.files || []);
      }

      return false;
    };

  }

  clearDragArea(): void {
    this.dropArea.nativeElement.classList.remove('dragOver');
  }

  processFiles(files: FileList): void {
    this.droppedItems = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const copyFileAttr = {
        name: file.name,
        lastModified: file.lastModified,
        path: file.path,
        size: file.size,
        type: file.type,
        hasError: true
      };

      if (copyFileAttr.name && copyFileAttr.name.includes('.pug')) {
        this.ipc.get('put/pugfiles', copyFileAttr).then(() => {
          this.renderSelectionComp();
        });
        copyFileAttr.hasError = false;
      } else {

        this.toastr.error(I18n.resolve('toastr_only_PUG'));

      }

      this.droppedItems.push(copyFileAttr);
    }



  }
  showSpinner(): boolean {
    return this.pdfSrc && this.showLoading;
  }
  enabledNavigator(): boolean {
    return this.showLoading;
  }
  isProcessingPdf(): boolean {
    return (!this.showLoading && this.pdfSrc && this.enableFullscreen);
  }
  goBackwardData(): void {
    if (this.enabledNavigator()) { return; }
    this.inlineEdit = false;
    this.currentIndex = (this.currentIndex + 1 + this.maxIndex) % this.maxIndex;
    this.selectionSelected(this.selection_selectedIds);
  }
  goForwardData(): void {
    if (this.enabledNavigator()) { return; }
    this.inlineEdit = false;
    this.currentIndex = (this.currentIndex - 1 + this.maxIndex) % this.maxIndex;
    this.selectionSelected(this.selection_selectedIds);
  }


  showFullScreen() {
    if (this.isProcessingPdf()) { return; }
    const selection = this.getSelection();
    if (selection) {
      this.enableFullscreen = false;
      this.ipc.get('put/pdf', { pugname: selection, locals: this.data[this.currentIndex], filename: 'preview.pdf' })
        .then((result: any) => {
          this.ipc.send('get/pdf/fullscreen', { filename: result.file });
          this.enableFullscreen = true;
        });
    }
  }
  toggleInline(): void {
    this.inlineEditValue = this.currentIndex + 1;
    this.inlineEdit = !this.inlineEdit;
  }
  inlineEditSave(): void {
    this.currentIndex = (this.inlineEditValue - 1 + this.maxIndex) % this.maxIndex;
    this.inlineEdit = false;
    this.selectionSelected(this.selection_selectedIds);

  }

  renderSelectionComp(): void {
    this.selection.getElements();

  }
  onProgressPdf(): void {
    this.showLoading = true;
  }
  pdfRendered(): void {
    this.showLoading = false;
  }

  selectionSelected(event: any) {
    const selection = (event && event.length) ? event[0] : null;
    if (selection) {
      this.selection_selectedIds = [selection];
      this.ipc.get('get/pdf/buffer', { pugname: selection, locals: this.data[this.currentIndex] })
        .then((result: any) => {
          if (!ErrorRequest.hasError(result)) {
            this.pdfSrc = result.buffer;
          } else {
            this.toastr.error(I18n.resolve('toastr_something_went_wrong') + JSON.stringify(result.error));
          }
        });
    } else {
      this.selection_selectedIds = [];
      this.pdfSrc = null;
    }
  }

  getSelection(): string {
    const selection = (this.selection_selectedIds && this.selection_selectedIds.length) ? this.selection_selectedIds[0] : null;
    return selection;
  }

  actionPdf(): void {
    // if (this.isProcessingPdf()) { return; }

    this.enableFullscreen = false;
    this.runAction('put/pdf');
    if (this.getSelection()) {
      this.ipc.send('get/pdf/folder', { pugname: this.getSelection() });
    }
  }

  actionPdfPrint(): void {
    // if (this.isProcessingPdf()) { return; }

    this.enableFullscreen = false;
    this.runAction('put/pdf/print');

  }

  actionMail(): void {
    console.log('mail');
  }

  runAction(channel: string, optional?: Object): void {
    const selection = this.getSelection();
    if (selection) {
      this.processCount = 0;
      for (const data of this.data) {
        this.ipc.send(channel, { pugname: selection, locals: data, ...optional });
      }
    }
  }
}
