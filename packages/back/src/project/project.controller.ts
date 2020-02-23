import { Controller, Get, Post, Put, Delete, Request, Res, Body, Param, HttpCode, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProjectService } from './project.service';
import { WorkspaceService } from './workspace.service';
import { Project } from './project.entity';
import { CreateProjectBodyDto, CreateProjectDto } from './dto/create-project.dto';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';

@Controller('api/projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService, private readonly workspaceService: WorkspaceService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createProject(@Request() req, @Body() createProjectDto: CreateProjectBodyDto) {
    return this.projectService.create(createProjectDto);
  }

  // @UseGuards(AuthGuard('jwt'))
  // @Post()
  // async createWorkspace(@Request() req, @Body() createWorkspaceDto: CreateWorkspaceDto) {
  //   console.log(req.user);
  //   return this.workspaceService.create(createWorkspaceDto);
  // }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(): Promise<Project[]> {
    return this.projectService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params): Promise<Project> {
    const task = await this.projectService.findOne(params.id);
    if (!task) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return task;
  }

  @Put(':id')
  update(@Param() params, @Body() updateProjectDto: CreateProjectDto) {
    return this.projectService.update(params.id, updateProjectDto);
  }

  // @Delete(':id')
  // @HttpCode(204)
  // delete(@Param() params): Promise<DeleteResult> {
  //   return this.projectService.delete(params.id);
  // }
}
