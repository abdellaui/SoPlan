export class MailConfig {
  host: string;
  port: number | string;
  user: string; // username
  pass: string; // password
  secure?: boolean; // true for 465(TLS), false for other ports

}
