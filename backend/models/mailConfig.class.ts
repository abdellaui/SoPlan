import { IsNotEmpty } from 'class-validator';

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
