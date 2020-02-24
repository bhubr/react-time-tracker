import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Timebox } from '../timebox/timebox.entity';
import { Project } from '../project/project.entity';
import { DailySheet } from '../daily-sheet/daily-sheet.entity';

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
    // eager: true
  })
  timeboxes: Timebox[];

  @ManyToOne(type => Project, project => project.tasks)
  project: Project;

  @ManyToOne(type => DailySheet, dailySheet => dailySheet.tasks)
  dailySheets: DailySheet;
}