import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Lesson } from './Lesson';
import { ReviewRecord } from './ReviewRecord';

@Entity()
export class Flashcard {
  @PrimaryGeneratedColumn() id!: number;

  @Column('text') question!: string;
  @Column('text') answer!: string;

  @ManyToOne(() => Lesson, lesson => lesson.flashcards, { onDelete: 'CASCADE' })
  lesson!: Lesson;

  @OneToMany(() => ReviewRecord, rec => rec.flashcard)
  reviewRecords!: ReviewRecord[];
} 