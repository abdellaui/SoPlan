import { Component, Input, OnInit } from '@angular/core';
import { DateRendererComponent } from '@components/table/date-renderer/date-renderer.component';
import { Comment, CommentSchema } from '@entity/comment/comment.entity';
import { FormBuilderSettings } from '@models/componentInput.class';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { validate, ValidationError } from 'class-validator';
import { LocalDataSource } from 'ng2-smart-table';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-entity-comment',
  templateUrl: './entity-comment.component.html',
  styleUrls: ['./entity-comment.component.scss']
})

// TODO: die Komponente soll erst auf comments zugreifen, wenn es defined ist !

export class EntityCommentComponent implements OnInit {
  @Input() entity: any;
  @Input() entityPostUrl: string;
  showThis = false;
  commentIsAccaptable = false;

  public uniqueName;

  public form_comment: Comment = new Comment();
  public form_commentSchema = CommentSchema;
  public form_commentSettings: FormBuilderSettings = <FormBuilderSettings>{
    header: 'Bemerkung hinzufügen',
    buttons: true,
    paddings: { left: 'md-12', right: 'md-12' },
    buttonText: 'hinzufügen',
    initialWarningsIgnore: true
  };



  constructor(private ipc: IpcRendererService, public toastr: ToastrService) {
    this.uniqueName = 'cm_' + new Date().getTime().toString();
  }

  settings = {
    selectMode: 'multi',
    columns: {
      content: {
        title: 'Inhalt',
        editor: { type: 'textarea' }
      },
      updatedDate: {
        title: 'Bearbeitet am',
        type: 'custom',
        renderComponent: DateRendererComponent,
        editable: false
      }
    },
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

  public data: LocalDataSource; // angezeigte daten
  public selectedData: any[] = []; // zwischenspeicher für auswahl
  public rememberIdOfDeleteError: number[] = [];
  public deletedCount = 0;

  getShow(): boolean {
    return (this.entityPostUrl && this.entity && this.entity.id);
  }
  ngOnInit() {
    this.data = new LocalDataSource(this.entity.comments);

    this.ipc.on('delete/comment', (event: any, arg: { deleted: boolean, id: number }) => {
      this.deletedCount--;
      if (arg.deleted === false) {
        this.rememberIdOfDeleteError.push(arg.id);
      } else {
        const index = this.entity.comments.findIndex(x => x.id === arg.id);
        if (index > -1) {
          this.entity.comments.splice(index, 1);
          this.data.refresh();
        }
      }
      if (!this.deletedCount) {
        this.showDeleteErrorToastr();
      }

    });
  }

  public checkFinished(event: boolean): void {
    this.commentIsAccaptable = event;
  }

  dataToEntity(data): any {
    return Object.assign(new Comment(), data);
  }

  public onSave(event: any): void {

    this.ipc.get('post/comment', this.form_comment).then((result: any) => {
      if (!('hasError' in result)) {
        this.toastr.info(`Kommentar erstellt`);
        const newComment: Comment = <Comment>result;
        this.entity.comments.push(newComment);
        this.data.refresh();
        this.ipc.get(this.entityPostUrl, this.entity).then((saved: any) => {
          if (!('hasError' in saved)) {
            this.form_comment = new Comment();
            this.form_commentSettings.initialWarningsIgnore = true;
          } else {
            this.toastr.error(`Fehler beim Zuweisen!`);
          }
        });
      } else {
        this.toastr.error(`Fehler! ${result.error}`);
      }

    });
  }


  onDeleteConfirm(event: any) {
    if (window.confirm('Sie versuchen ein Eintrag zu löschen!') && !this.deletedCount) {
      this.deletedCount = 1;
      this.clearDeleteErrors();
      this.ipc.send('delete/comment', this.dataToEntity(event.data));
    } else {
      event.confirm.reject();
    }
  }

  /**
   * bei speichern einer Änderung
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


        for (const error of errors) {
          document
            .querySelector(`ng2-smart-table#${this.uniqueName} tr:nth-child(${index}) [ng-reflect-name="${error.property}"]`)
            .classList.add('validationErrorBorder');
        }
      }
    });
  }

  /**
   * bei Auswahl von eine oder mehrere Zeilen
   * Auswahl wird intern abgespeichert
   */
  onSelectRow(event: any): void {
    this.selectedData = event.selected;
  }

  saveEntity(entity: any): void {
    this.ipc.send('post/comment', entity);
  }


  deleteAllSelected(): void {

    if (window.confirm(`Sie versuchen ${this.selectedData.length} Einträge zu löschen!`) && !this.deletedCount) {
      this.deletedCount = this.selectedData.length;
      this.clearDeleteErrors();
      for (const data of this.selectedData) {
        this.ipc.send('delete/comment', this.dataToEntity(data));
      }
    }
  }

  clearDeleteErrors(): void {
    this.rememberIdOfDeleteError = [];
    const rowsOfTable = document.querySelectorAll('[ng-reflect-klass="ng2-smart-row"]');
    for (let i = 0; i < rowsOfTable.length; ++i) {
      rowsOfTable[i].classList.remove('validationErrorBorder');
    }
  }

  handleDeleteError(indexOfData: number): void {

    const rowsOfTable = document.querySelectorAll('[ng-reflect-klass="ng2-smart-row"]');
    rowsOfTable[indexOfData].classList.add('validationErrorBorder');
  }

  showDeleteErrorToastr(): void {

    if (this.rememberIdOfDeleteError.length) {
      this.data.getAll().then((dataArray: any[]) => {
        this.rememberIdOfDeleteError.forEach((id: number) => {
          const indexFromId = dataArray.findIndex(x => x.id === id);
          if (indexFromId > -1) {
            this.handleDeleteError(indexFromId);
          }
        });
      });
      this.toastr.error(`Rot umrahmte Einträge (#${this.rememberIdOfDeleteError.length}) konnten nicht gelöscht werden!
      Entfernen Sie vorab die Abhängigkeiten!`);
    }
  }
}
