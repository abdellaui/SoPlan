import { Contains } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Contains('hello')
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

}
