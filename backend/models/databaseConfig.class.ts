import { IsNotEmpty } from 'class-validator';

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
