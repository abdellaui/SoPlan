import * as Settings from 'electron-settings';
import * as Nodemailer from 'nodemailer';
import { Options } from 'nodemailer/lib/smtp-transport';

import { MailConfig } from '../models/configs.class';
import { ErrorRequest } from '../models/errorRequest.class';
import { end, logException, on, send } from './../slots';

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

  on('post/mail/send', (event: any, mailOptions: any) => {

    if (checkTransporter()) {
      getTransporter().sendMail(mailOptions)
        .then(() => {
          send(event, 'post/mail/send', mailOptions);
        })
        .catch((error: any) => {
          logException(error);
          send(event, 'post/mail/send', ErrorRequest.create(error, mailOptions));
        });
    } else {
      send(event, 'post/mail/send', ErrorRequest.create('no transporter', mailOptions));
    }
  });

}
