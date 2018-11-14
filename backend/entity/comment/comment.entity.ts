import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { FormElement, TextArea } from '../../models/formBuilder.class';

@Entity()
export class Comment extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column()
  content: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

}

const CommentSchema: FormElement[] = [
  {
    name: 'Inhalt',
    member: 'content',
    element: new TextArea()
  },
];

export { CommentSchema };

