import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Task } from '../task/task.entity';
import { User } from '../user/user.entity';
import { Workspace } from './workspace.entity';

export enum ProjectStatus {
  ACTIVE = 'ACTIVE',
  ARCHIVED = 'ARCHIVED',
  DELETED = 'DELETED'
}

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({
    type: 'enum',
    enum: ProjectStatus,
    default: ProjectStatus.ACTIVE
  })
  status: ProjectStatus;

  @ManyToMany(type => User, user => user.projects)
  users: User[];

  @ManyToMany(type => Workspace, workspace => workspace.projects)
  @JoinTable({
    name: 'workspace_project'
  })
  workspaces: Workspace[]; 

  @OneToMany(type => Task, task => task.project, {
    eager: true
  })
  tasks: Task[];
}