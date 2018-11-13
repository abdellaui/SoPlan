import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { FormElement, Input } from '../../models/formBuilder.class';

@Entity()
export class Comment extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column()
  content: string;

  @IsNotEmpty()
  @CreateDateColumn()
  createdDate: Date;

  @IsNotEmpty()
  @UpdateDateColumn()
  updatedDate: Date;

}

const CommentSchema: FormElement[] = [
  {
    name: 'Inhalt',
    member: 'content',
    element: new Input('text')
  }
];

export { CommentSchema };

