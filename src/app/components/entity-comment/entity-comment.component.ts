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



export class EntityCommentComponent implements OnInit {
  @Input() entity: any;
  @Input() entityPostUrl: string;
  showThis = false;
  commentIsAccaptable = false;

  public form_commentInstance: Comment = new Comment();
  public form_commentSchema = CommentSchema;
  public form_commentSettings: FormBuilderSettings = <FormBuilderSettings>{
    header: 'Bemerkung hinzufügen',
    buttons: true,
    paddings: { left: 'md-12', right: 'md-12' },
    buttonText: 'hinzufügen',
    initialWarningsIgnore: true
  };



  constructor(private ipc: IpcRendererService, public toastr: ToastrService) { }

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

  getShow(): boolean {
    return (this.entityPostUrl && this.entity && this.entity.id);
  }
  ngOnInit() {

    this.data = new LocalDataSource(this.entity.comments);
  }

  public checkFinished(event: boolean): void {
    this.commentIsAccaptable = event;
  }

  dataToEntity(data): any {
    return Object.assign(new Comment(), data);
  }

  public onSave(event: any): void {

    this.ipc.get('post/comment', this.form_commentInstance).then((result: any) => {
      if (result !== 0) {
        this.toastr.info(`Kommentar erstellt`);
        const newComment: Comment = <Comment>result;
        this.entity.comments.push(newComment);
        this.data.refresh();
        this.ipc.get(this.entityPostUrl, this.entity).then((saved: any) => {
          if (saved !== 0) {
            this.form_commentInstance = new Comment();
            this.form_commentSettings.initialWarningsIgnore = true;
          } else {
            this.toastr.error(`Fehler beim Zuweisen!`);
          }
        });
      } else {
        this.toastr.error(`Fehler!`);
      }

    });
  }


  onDeleteConfirm(event: any) {
    if (window.confirm('Sie versuchen ein Eintrag zu löschen!')) {
      this.ipc.get('delete/comment', this.dataToEntity(event.data)).then((result: number) => {
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
    this.ipc.get('post/comment', entity).then(r => {
    });
  }


  deleteAllSelected(): void {

    if (window.confirm(`Sie versuchen ${this.selectedData.length} Einträge zu löschen!`)) {
      for (const data of this.selectedData) {
        this.ipc.get('delete/comment', this.dataToEntity(data)).then((result: number) => {
          if (result === 0) {
            window.alert(data); // TODO: handle could not delete
          }
        });
      }
    }
  }
}
