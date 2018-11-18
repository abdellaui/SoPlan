import { Component, Input, OnInit } from '@angular/core';
import { Comment, CommentSchema } from '@entity/comment/comment.entity';
import { FormBuilderSettings } from '@models/componentInput.class';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
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

  getShow(): boolean {
    return (this.entityPostUrl && this.entity && this.entity.id);
  }
  ngOnInit() {
    // zeige dies nur falls entität existiert

  }

  public checkFinished(event: boolean): void {
    this.commentIsAccaptable = event;
  }

  public onSave(event: any): void {

    this.ipc.get('post/comment', this.form_commentInstance).then((result: any) => {
      if (result !== 0) {
        this.toastr.info(`Kommentar erstellt`);
        const newComment: Comment = <Comment>result;
        this.entity.comments.push(newComment);
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
}
