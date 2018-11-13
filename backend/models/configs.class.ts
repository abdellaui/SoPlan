import { IsNotEmpty } from 'class-validator';

export class AdminLogin {
  username: string;
  password: string;
}

export class CustomEMail {
  @IsNotEmpty()
  from: string;

  @IsNotEmpty()
  to: string;

  @IsNotEmpty()
  subject: string;

  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  html: string;
}

export class DatabaseConfig {
  @IsNotEmpty()
  host: string;

  @IsNotEmpty()
  port: number | string;

  @IsNotEmpty()
  username: string;

  password: string;

  @IsNotEmpty()
  database: string;
}

export class MailConfig {
  @IsNotEmpty()
  host: string;

  @IsNotEmpty()
  port: number;

  @IsNotEmpty()
  user: string; // username

  @IsNotEmpty()
  pass: string; // password
}
