import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { Workspace } from './workspace.entity';
import { Project } from './project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Workspace)
    private readonly workspaceRepository: Repository<Workspace>,
  ) {}

  async create(projectDto: CreateProjectDto): Promise<Project> {
    const project:Project = new Project();
    const { title, workspaceId } = projectDto;
    const workspace = await this.workspaceRepository.findOne(workspaceId);
    project.title = title;
    project.workspaces = [workspace];
    console.log(project);
    return this.projectRepository.save(project);
  }

  findAll(): Promise<Project[]> {
    return this.projectRepository.find();
  }

  findOne(projectId): Promise<Project> {
    return this.projectRepository.findOne(projectId);
  }

  async update(projectId, projectDto: CreateProjectDto): Promise<Project> {
    await this.projectRepository.update(projectId, projectDto);
    return this.projectRepository.findOne(projectId);
  }

  delete(projectId): Promise<DeleteResult> {
    return this.projectRepository.delete(projectId);
  }
}