import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { EntitySelectComponent } from '@components/entity-select/entity-select.component';
import { EntitySelectSettings } from '@models/componentInput.class';
import { ErrorRequest } from '@models/errorRequest.class';
import { I18n } from '@models/translation/i18n.class';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pug-select',
  templateUrl: './pug-select.component.html',
  styleUrls: ['./pug-select.component.scss']
})
export class PugSelectComponent implements OnInit, AfterViewInit {
  @ViewChild('dropArea') dropArea: ElementRef;
  @ViewChild('selection') selection: EntitySelectComponent;
  @Input() data: any[] = [];

  public _i18n = I18n;
  public actionIsRunning = false;
  public actionStatus = { count: 0, channel: '' };
  public inlineEdit = false;
  public inlineEditValue = 1;
  public enableFullscreen = true;
  public mailSubject = false;
  public mailSubjectValue = '';
  public currentIndex = 0;
  public maxIndex = 1;


  public pdfSrc = null;
  public showLoading = false;
  public droppedItems: any[] = [];
  public selection_selectedIds: string[] = [];
  public selection_settings: EntitySelectSettings = <EntitySelectSettings>{
    getUrl: 'get/pugfiles',
    listNameMembers: ['name'],
    listTitleMembers: ['created'],
    header: I18n.resolve('pug_files'),
    maxSelection: 1,
    showCreateButton: false
  };
  constructor(public ipc: IpcRendererService, public toastr: ToastrService) { }

  ngOnInit() {
    this.maxIndex = this.data.length;

    this.ipc.on('put/pdf', (event: any, arg: any) => {
      if (this.actionStatus.channel === 'put/pdf') {
        this.actionStatus.count++;
        if (this.actionStatus.count >= this.data.length) {
          this.actionIsRunning = false;
          this.enableFullscreen = true;
        }
      }
    });

    this.ipc.on('put/pdf/print', (event: any, arg: any) => {
      if (this.actionStatus.channel === 'put/pdf/print') {
        this.actionStatus.count++;
        if (this.actionStatus.count >= this.data.length) {
          this.actionIsRunning = false;
          this.enableFullscreen = true;
        }
      }
    });

    this.ipc.on('post/mail/pug', (event: any, arg: any) => {
      if (this.actionStatus.channel === 'post/mail/pug') {
        this.actionStatus.count++;
        if (this.actionStatus.count >= this.data.length) {
          this.actionIsRunning = false;
          this.enableFullscreen = true;
          this.mailSubject = false;
        }
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

      if (copyFileAttr.name) {
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
    return (this.showSpinner() || !this.enableFullscreen);
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

    this.runAction('put/pdf');

    if (this.getSelection()) {
      setTimeout(() => {
        this.ipc.send('get/pdf/folder', { pugname: this.getSelection() });
      }, 1000);
    }
  }

  openPugFolder() {
    this.ipc.send('get/pugfolder');
  }

  actionPdfPrint(): void {
    this.runAction('put/pdf/print');
  }

  toggleMailSubject(): void {
    this.mailSubject = !this.mailSubject;
  }
  actionMail(): void {
    this.runAction('post/mail/pug', { subject: this.mailSubjectValue });
  }

  runAction(channel: string, optional?: Object): void {
    if (this.isProcessingPdf()) { return; }
    const selection = this.getSelection();
    if (selection) {
      window.scrollTo(0, 0);
      this.actionIsRunning = true;
      this.enableFullscreen = false;
      this.actionStatus = { count: 0, channel: channel };
      setTimeout(() => {
        for (const data of this.data) {
          this.ipc.send(channel, { pugname: selection, locals: data, ...optional });
        }
      }, 10);
    }
  }
}
