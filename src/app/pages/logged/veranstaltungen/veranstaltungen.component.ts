import { Component, OnInit } from '@angular/core';
import { CustomEMail } from '@models/configs.class';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { validate } from 'class-validator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-veranstaltungen',
  templateUrl: './veranstaltungen.component.html',
  styleUrls: ['./veranstaltungen.component.scss']
})



export class VeranstaltungenComponent implements OnInit {

  disableSendButton = false;

  formSchema: any = [
    { name: 'From', member: 'from', type: 'text' },
    { name: 'To', member: 'to', type: 'text' },
    { name: 'Subject', member: 'subject', type: 'text' },
    { name: 'Text', member: 'text', type: 'text' },
    { name: 'Html', member: 'html', type: 'text' }
  ];


  public mailOptions: CustomEMail = new CustomEMail();

  constructor(private ipc: IpcRendererService, private toastr: ToastrService) {
    this.mailOptions.from = 'Tolga Akkiraz <rounderskillz@gmail.com>';
    this.mailOptions.to = 'a-sahin@hotmail.de';
    this.mailOptions.subject = `Testing nodemail - ${new Date().toString()}`;
    this.mailOptions.text = 'im sending with nodemailer. it works!'; // plain text body
    this.mailOptions.html = '<p>im sending with nodemailer. it works!</p>'; // html body,
  }


  sendMail(): void {
    this.disableSendButton = true;

    validate(this.mailOptions).then(errors => {
      if (errors.length > 0) {
        this.toastr.error('Bitte füllen Sie alle Felder aus!');
        this.disableSendButton = false;
      } else {
        this.ipc.get<boolean>('post/mail/send', this.mailOptions).then(result => {
          if (result) {
            this.toastr.info('Die Nachricht wurde erfolgreich verschickt');
          } else {
            this.toastr.error('Die Nachricht wurde nicht verschickt!');
          }
          this.disableSendButton = false;
        });

      }
    });

  }

  ngOnInit() {
  }

  finishPerson(event: any) {
    console.log({ finishedPerson: event });
  }
}
