import { Controller, Get, Post, Put, Delete, Request, Res, Body, Param, HttpCode, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProjectService } from './project.service';
import { WorkspaceService } from './workspace.service';
import { Workspace } from './workspace.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { CreateWorkspaceDto, CreateWorkspaceBodyDto } from './dto/create-workspace.dto';

@Controller('api/workspaces')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@Request() req): Promise<Workspace[]> {
    const { user } = req;
    return this.workspaceService.findAll(user);
  }


  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Request() req, @Body() workspaceBodyDto: CreateWorkspaceBodyDto) {
    const workspaceDto: CreateWorkspaceDto = {
      ...workspaceBodyDto, user: req.user
    }
    return this.workspaceService.create(workspaceDto);
  }
}
