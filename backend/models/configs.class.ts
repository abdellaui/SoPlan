import { IsNotEmpty } from 'class-validator';
import { FormElement, Input } from './formBuilder.class';
import { I18n } from '../../src/translation/language';

export class AdminLogin {
  username: string;
  password: string;
}

export class CustomEMail {
  @IsNotEmpty({message: I18n.resolve('config_field_warning')})
  from: string;

  @IsNotEmpty({message: I18n.resolve('config_field_warning')})
  to: string;

  @IsNotEmpty({message: I18n.resolve('config_field_warning')})
  subject: string;

  @IsNotEmpty({message: I18n.resolve('config_field_warning')})
  text: string;

  @IsNotEmpty({message: I18n.resolve('config_field_warning')})
  html: string;
}

export class DatabaseConfig {
  @IsNotEmpty({message: I18n.resolve('config_field_warning')})
  host: string;

  @IsNotEmpty({message: I18n.resolve('config_field_warning')})
  port: number | string;

  @IsNotEmpty({message: I18n.resolve('config_field_warning')})
  username: string;

  @IsNotEmpty({message: I18n.resolve('config_field_warning')})
  password: string;

  @IsNotEmpty({message: I18n.resolve('config_field_warning')})
  database: string;
}

const DatabaseConfigSchema: FormElement[] = [
  {
    name: I18n.resolve('config_db_host'),
    member: 'host',
    element: new Input('text')
  },
  {
    name: I18n.resolve('config_db_port'),
    member: 'port',
    element: new Input('text')
  },
  {
    name: I18n.resolve('config_db_username'),
    member: 'username',
    element: new Input('text')
  },
  {
    name: I18n.resolve('config_db_password'),
    member: 'password',
    element: new Input('password')
  },
  {
    name: I18n.resolve('config_db_databasename'),
    member: 'database',
    element: new Input('text')
  }
];
export { DatabaseConfigSchema };

export class MailConfig {
  @IsNotEmpty({message: I18n.resolve('config_field_warning')})
  host: string;

  @IsNotEmpty({message: I18n.resolve('config_field_warning')})
  port: number;

  @IsNotEmpty({message: I18n.resolve('config_field_warning')})
  user: string; // username

  @IsNotEmpty({message: I18n.resolve('config_field_warning')})
  pass: string; // password
}
const MailConfigSchema: FormElement[] = [
  {
    name: I18n.resolve('config_mail_host'),
    member: 'host',
    element: new Input('text')
  },
  {
    name: I18n.resolve('config_mail_port'),
    member: 'port',
    element: new Input('text')
  },
  {
    name: I18n.resolve('config_mail_user'),
    member: 'user',
    element: new Input('text')
  },
  {
    name: I18n.resolve('config_mail_password'),
    member: 'pass',
    element: new Input('password')
  }
];
export { MailConfigSchema };

export class PugConfig {
  public filepath: string;
  public outputpath: string;
  public config: {};

  constructor(filepath, outputpath, config) {
    this.filepath = filepath;
    this.outputpath = outputpath;
    this.config = config;
  }
}

export class PdfConfig {
  public filepath: string;
  public outputpath: string;
  public config: {};

  constructor(filepath, outputpath, config) {
    this.filepath = filepath;
    this.outputpath = outputpath;
    this.config = config;
  }

  public static defaultPdfSettings() {
    const avaiblePaperSizes = ['A5', 'A4', 'A3', 'Legal', 'Letter', 'Tabloid'];
    const option = {
        marginsType: 0,
        pageSize: avaiblePaperSizes[1],
        printBackground: false,
        printSelectionOnly: false,
        landscape: false,
    };
    return option;
  }
}

export class PugToPdfConfig {
  public filepathPug: string;
  public filepathGeneratedHtml: string;
  public filepathGeneratedPdf: string;
  public pugConf: {};
  public pdfConf: {};
}
