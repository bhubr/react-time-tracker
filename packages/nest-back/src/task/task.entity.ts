import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ default: false })
  critical: boolean;

  @Column({ default: true })
  active: boolean;

  @Column({ default: false })
  done: boolean;
}