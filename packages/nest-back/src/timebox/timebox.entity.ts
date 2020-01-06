import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Task } from '../task/task.entity';

export enum TimeboxType {
  POMODORO = 'POMODORO',
  SHORT_BREAK = 'SHORT_BREAK',
  LONG_BREAK = 'LONG_BREAK'
}

@Entity()
export class Timebox {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: TimeboxType
  })
  type: TimeboxType

  @Column({ length: 255, default: '' })
  comment: string;

  @Column({ type: 'datetime', nullable: true })
  start: string;

  @Column({ type: 'datetime', nullable: true })
  end: string;

  @ManyToOne(type => Task, task => task.timeboxes)
  task: Task;
}