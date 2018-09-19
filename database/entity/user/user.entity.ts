import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { Contains } from 'class-validator';

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
