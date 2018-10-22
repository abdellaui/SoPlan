import * as Settings from 'electron-settings';
import * as Nodemailer from 'nodemailer';
import { Options } from 'nodemailer/lib/smtp-transport';

import { MailConfig } from '../models/mailConfig.class';
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


  on('get/mail/config', (event: any, arg: any) => {
    const config: MailConfig = Settings.get('mailconfig');
    setTransporter(config);
    send(event, 'get/mail/config', config);
  });

  on('post/mail/config', (event: any, config: MailConfig) => {
    setTransporter(config);
    Settings.set('mailconfig', config);
    end(event);
  });

  on('post/mail/send', (event: any, mailOptions: any) => {

    if (checkTransporter()) {
      getTransporter().sendMail(mailOptions)
        .then((result) => {
          send(event, 'post/mail/send', true);
          console.log(result);
        })
        .catch((error) => {
          send(event, 'post/mail/send', false);
          console.log('error', error);
        });
    } else {
      send(event, 'post/mail/send', false);
    }
  });

}
