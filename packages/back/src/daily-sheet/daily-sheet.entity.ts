import { Entity, Column, CreateDateColumn, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Task } from '../task/task.entity';
import { User } from '../user/user.entity';

@Entity()
export class DailySheet {
  // @PrimaryGeneratedColumn()
  // id: number;

  // @CreateDateColumn({ primary: true, type: 'date' })
  @PrimaryColumn({ type: 'date' })
  today: string;

  @ManyToMany(type => Task, task => task.dailySheets, {
    eager: false
  })
  @JoinTable({
    name: 'task_daily_sheet'
  })
  tasks: Task[];

  @ManyToOne(
    type => User,
    user => user.dailySheets,
    { primary: true }
  )
  user: User;
}