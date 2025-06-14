import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Lesson } from './Lesson';
import { GenerationTask } from './GenerationTask';

@Entity()
export class Course {
  @PrimaryGeneratedColumn() id: number;

  @Column({ length: 200 }) title: string;
  @Column('text') description: string;

  @ManyToOne(() => GenerationTask, gt => gt.courses, { eager: true })
  generationTask: GenerationTask;

  @OneToMany(() => Lesson, lesson => lesson.course, { cascade: true })
  lessons: Lesson[];
} 