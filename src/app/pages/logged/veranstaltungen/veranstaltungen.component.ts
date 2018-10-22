import { Component, OnInit } from '@angular/core';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-veranstaltungen',
  templateUrl: './veranstaltungen.component.html',
  styleUrls: ['./veranstaltungen.component.scss']
})
export class VeranstaltungenComponent implements OnInit {
  formSchema: any = [
    { name: 'From', member: 'from', type: 'text' },
    { name: 'To', member: 'to', type: 'text' },
    { name: 'Subject', member: 'subject', type: 'text' },
    { name: 'Text', member: 'text', type: 'text' },
    { name: 'Html', member: 'html', type: 'text' }
  ];

  public mailOptions = {
    from: 'Tolga Akkiraz <rounderskillz@gmail.de>',
    to: 'rhz82581@awsoo.com',
    subject: `Testing nodemail - ${new Date().toString()}`,
    text: 'im sending with nodemailer. it works!', // plain text body
    html: '<p>im sending with nodemailer. it works!</p>', // html body,
  };


  constructor(private ipc: IpcRendererService, private toastr: ToastrService) { }

  sendMail(): void {
    if (this.mailOptions) {
      this.ipc.send('post/mail/send', this.mailOptions);
      this.toastr.info('Die Nachricht wurde erfolgreich verschickt');
    }
    // this.toastr.error('Bitte füllen Sie alle Felder aus!');
  }

  ngOnInit() {
  }

}
