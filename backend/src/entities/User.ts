import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ReviewRecord } from './ReviewRecord';
import { StudentProgress } from './StudentProgress';

export enum UserRole { STUDENT = 'student', INSTRUCTOR = 'instructor' }

@Entity()
export class User {
  @PrimaryGeneratedColumn() id: number;

  @Column({ unique: true, length: 150 })
  email: string;

  @Column() passwordHash: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.STUDENT })
  role: UserRole;

  @OneToMany(() => ReviewRecord, (rec: ReviewRecord) => rec.user)
  reviewRecords: ReviewRecord[] = [];

  @OneToMany(() => StudentProgress, (sp: StudentProgress) => sp.user)
  progressRecords: StudentProgress[] = [];
}