import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert, BeforeUpdate, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ReviewRecord } from './ReviewRecord';
import { StudentProgress } from './StudentProgress';

import bcrypt from 'bcrypt';

export enum UserRole { STUDENT = 'student', INSTRUCTOR = 'instructor' }

@Entity()
export class User {
  @PrimaryGeneratedColumn() id!: number;

  @Column({ unique: true, length: 150 })
  email!: string;

  @Column({ select: false }) passwordHash!: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.STUDENT })
  role!: UserRole;

  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;

  @OneToMany(() => ReviewRecord, (rec: ReviewRecord) => rec.user)
  reviewRecords!: ReviewRecord[];

  @OneToMany(() => StudentProgress, (sp: StudentProgress) => sp.user)
  progressRecords!: StudentProgress[];

  @BeforeInsert()
  @BeforeUpdate()
  private normalizeEmail() {
    this.email = this.email.trim().toLowerCase();
  }

  @BeforeInsert()
  @BeforeUpdate()
  private async hashPassword() {
    const bcryptPattern = /^\$2[aby]\$\d{2}\$.{53}$/;
    if (!bcryptPattern.test(this.passwordHash)) {
      this.passwordHash = await bcrypt.hash(this.passwordHash, 12);
    }
  }
}