import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { Workspace } from './workspace.entity';
import { User } from '../user/user.entity';

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectRepository(Workspace)
    private readonly workspaceRepository: Repository<Workspace>,
  ) {}

  create(workspaceDto: CreateWorkspaceDto): Promise<Workspace> {
    const workspace:Workspace = new Workspace();
    workspace.title = workspaceDto.title;
    workspace.user = workspaceDto.user;
    return this.workspaceRepository.save(workspace);
  }

  findAll(user: User): Promise<Workspace[]> {
    return this.workspaceRepository.find({ where: { user }, relations: ['projects'] });
  }

  findOne(workspaceId): Promise<Workspace> {
    return this.workspaceRepository.findOne(workspaceId);
  }

  async update(workspaceId, workspaceDto: CreateWorkspaceDto): Promise<Workspace> {
    await this.workspaceRepository.update(workspaceId, workspaceDto);
    return this.workspaceRepository.findOne(workspaceId);
  }

  delete(workspaceId): Promise<DeleteResult> {
    return this.workspaceRepository.delete(workspaceId);
  }
}