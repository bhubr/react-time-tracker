import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { CreateProjectDto, CreateProjectBodyDto } from './dto/create-project.dto';
import { Project } from './project.entity';
import { Workspace } from './workspace.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,

    @InjectRepository(Workspace)
    private readonly workspaceRepository: Repository<Workspace>,
  ) {}

  async create(projectBodyDto: CreateProjectBodyDto): Promise<Project> {
    const { workspaceId, ...projectIntrinsicFields } = projectBodyDto;
    const workspace = await this.workspaceRepository.findOne(workspaceId);
    const projectDto = { ...projectIntrinsicFields, workspaces: [workspace] };
    return this.projectRepository.save(projectDto)
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