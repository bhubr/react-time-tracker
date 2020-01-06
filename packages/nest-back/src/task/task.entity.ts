import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Timebox } from '../timebox/timebox.entity';

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

  @OneToMany(type => Timebox, timebox => timebox.task, {
    eager: true
  })
  timeboxes: Timebox[];
}