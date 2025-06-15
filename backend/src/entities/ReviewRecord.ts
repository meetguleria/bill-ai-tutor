import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './User';
import { Flashcard } from './Flashcard';

@Entity()
export class ReviewRecord {
  @PrimaryGeneratedColumn() id!: number;

  @ManyToOne(() => User, user => user.reviewRecords, { eager: true })
  user!: User;

  @ManyToOne(() => Flashcard, card => card.reviewRecords, { eager: true })
  flashcard!: Flashcard;

  @CreateDateColumn() reviewedAt!: Date;
  @Column({ type: 'timestamp' }) nextReview!: Date;
  @Column('int') intervalDays!: number;
  @Column('float') easeFactor!: number;
} 