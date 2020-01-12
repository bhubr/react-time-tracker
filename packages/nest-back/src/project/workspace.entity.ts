import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, ManyToOne, JoinTable } from 'typeorm';
import { Project } from './project.entity';
import { User } from '../user/user.entity';

@Entity()
export class Workspace {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @ManyToMany(type => Project, project => project.workspaces, {
    eager: true
  })
  @JoinTable({
    name: 'workspace_project'
  })
  projects: Project[];

  @ManyToOne(type => User, user => user.workspaces)
  user: User;
}