import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Course } from './Course';
import { Lesson } from './Lesson';

@Entity()
export class GenerationTask {
  @PrimaryGeneratedColumn() id: number;

  @Column('text') prompt: string;
  @Column({ length: 50 }) modelName: string;
  @CreateDateColumn() createdAt: Date;

  @OneToMany(() => Course, course => course.generationTask)
  courses: Course[];

  @OneToMany(() => Lesson, lesson => lesson.generationTask)
  lessons: Lesson[];
} 