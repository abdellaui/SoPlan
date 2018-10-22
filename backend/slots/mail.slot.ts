import { MailConfig } from '../models/mailConfig.class';
import * as Settings from 'electron-settings';
import { end, on, send } from './../slots';
import * as nodemailer from 'nodemailer';

let __Transporter: any = null;

function setTransporter(mailconfig: MailConfig): void {

  /**
   * Setting secure to false does not mean that you would not use an encrypted connection.
   */
  nodemailer.createTransport();
  __Transporter = nodemailer.createTransport({
    host: mailconfig.host,
    port: mailconfig.port,
    secure: (mailconfig.port === 465) ? true : false,
    auth: {
      user: mailconfig.user,
      pass: mailconfig.pass
    }
  });
}

function getTransporter(): any {
  if (__Transporter) {
    return __Transporter;
  }
}

export function init() {


  on('get/mail/config', (event: any, arg: any) => {
    const configs: MailConfig = Settings.get('mailconfig');
    setTransporter(configs);
    send(event, 'get/mail/config', configs);
  });

  on('post/mail/config', (event: any, config: MailConfig) => {
    setTransporter(config);
    Settings.set('mailconfig', config);
    end(event);
  });

  on('post/mail/send', (event: any, mailOptions: any) => {

    getTransporter().sendMail(mailOptions, (err, info) => {
      if (err) {
        return console.log(err);
      }

      return console.log(info);
    });
  });

}
