import { app } from 'electron';
import { fromPugToHtml, printPugToPdf } from 'electron-pug-printer';
import * as Settings from 'electron-settings';
import * as Nodemailer from 'nodemailer';
import { Options } from 'nodemailer/lib/smtp-transport';
import * as path from 'path';

import { MailConfig } from '../models/configs.class';
import { ErrorRequest } from '../models/errorRequest.class';
import { end, on, send } from './../slots';

let __Transporter: any = null;

function setTransporter(mailconfig: MailConfig): void {

  /**
   * Setting secure to false does not mean that you would not use an encrypted connection.
   */
  __Transporter = Nodemailer.createTransport(<Options>{
    host: mailconfig.host,
    port: mailconfig.port,
    secure: (mailconfig.port === 465),
    auth: {
      user: mailconfig.user,
      pass: mailconfig.pass
    }

  });
}

function checkTransporter(): boolean {
  return (__Transporter);
}
function getTransporter(): any {
  if (checkTransporter()) {
    return __Transporter;
  } else {
    return undefined;
  }
}

export function init() {
  const _pO_PDF = {
    marginsType: 0,
    printBackground: false,
    printSelectionOnly: false,
    landscape: false
  };
  const appDataPugPath = path.join(app.getPath('userData'), '/pugfiles');

  const defaultMailConfig: MailConfig = {
    host: '',
    port: null,
    user: '',
    pass: ''
  };

  if (!Settings.has('mailconfig')) {
    Settings.set('mailconfig', defaultMailConfig);
  }

  setTransporter(Settings.get('mailconfig'));

  on('get/mail/config', (event: any) => {
    send(event, 'get/mail/config', <MailConfig>Settings.get('mailconfig'));
  });

  on('post/mail/config', (event: any, config: MailConfig) => {
    setTransporter(config);
    Settings.set('mailconfig', config);
    end(event);
  });

  on('post/mail/pug', (event: any, arg: { pugname: string, locals: any, subject: string }) => {
    if (checkTransporter() && arg.locals.hasOwnProperty('mail') && <any>arg.locals.mail) {
      printPugToPdf({
        pugOptions: {
          filePath: path.join(appDataPugPath, arg.pugname),
          locals: arg.locals
        },
        printOptions: _pO_PDF
      }).then((data: Buffer) => {
        console.log(data);
        const mailOptions = {
          from: `SoPlan <noreply@soplan.de>`,
          to: arg.locals.mail, // receiver
          subject: arg.subject, // subject
          html: fromPugToHtml(path.join(appDataPugPath, arg.pugname), arg.locals),
          attachments: [{
            filename: 'mail.pdf',
            contentType: 'application/pdf',
            content: data
          }]
        };

        getTransporter().sendMail(mailOptions)
          .then(() => {
            send(event, 'post/mail/pug', mailOptions);
          })
          .catch((error: any) => {
            send(event, 'post/mail/pug', ErrorRequest.create(error, mailOptions));
          });


        send(event, 'post/mail/pug', { input: arg, buffer: data });
      }).catch((error: any) => {
        send(event, 'post/mail/pug', ErrorRequest.create(error, arg));
      });


    } else {
      send(event, 'post/mail/pug', ErrorRequest.create('no transporter', arg));
    }
  });

}
