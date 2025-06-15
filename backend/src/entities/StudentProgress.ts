import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';
import { Concept } from './Concept';

@Entity()
export class StudentProgress {
  @PrimaryGeneratedColumn() id!: number;

  @ManyToOne(() => User, user => user.progressRecords, { eager: true })
  user!: User;

  @ManyToOne(() => Concept, concept => concept.users, { eager: true })
  concept!: Concept;

  @Column('float') masteryLevel!: number; // 0.0–1.0
  @Column('timestamp') lastUpdated!: Date;
} 