import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { WorkspaceService } from './workspace.service';
import { WorkspaceController } from './workspace.controller';
import { Project } from './project.entity';
import { Workspace } from './workspace.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Workspace]),
    TypeOrmModule.forFeature([Project])
  ],
  providers: [ProjectService, WorkspaceService],
  controllers: [ProjectController, WorkspaceController],
})
export class ProjectModule {}