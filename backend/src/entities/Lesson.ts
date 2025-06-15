import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany } from 'typeorm';
import { Course } from './Course';
import { Flashcard } from './Flashcard';
import { GenerationTask } from './GenerationTask';
import { Concept } from './Concept';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn() id!: number;

  @Column({ length: 200 }) title!: string;
  @Column('text') content!: string;

  @ManyToOne(() => Course, course => course.lessons, { onDelete: 'CASCADE' })
  course!: Course;

  @ManyToOne(() => GenerationTask, gt => gt.lessons, { eager: true })
  generationTask!: GenerationTask;

  @OneToMany(() => Flashcard, card => card.lesson, { cascade: true })
  flashcards!: Flashcard[];
  
  @ManyToMany(() => Concept, concept => concept.lessons, { cascade: true })
  concepts!: Concept[];
} 