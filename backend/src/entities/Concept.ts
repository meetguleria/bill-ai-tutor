import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Lesson } from './Lesson';
import { User } from './User';

@Entity()
export class Concept {
  @PrimaryGeneratedColumn() id!: number;

  @Column({ length: 100 }) name!: string;
  @Column('text', { nullable: true }) description!: string;

  @ManyToMany(() => Lesson, lesson => lesson.concepts)
  lessons!: Lesson[];

  @ManyToMany(() => User, user => user.progressRecords)
  @JoinTable()
  users!: User[];
} 