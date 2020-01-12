import { Controller, Get, Post, Put, Delete, Res, Body, Param, HttpCode, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('api/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params): Promise<Task> {
    const task = await this.taskService.findOne(params.id);
    if (!task) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return task;
  }

  @Put(':id')
  update(@Param() params, @Body() updateTaskDto: CreateTaskDto) {
    return this.taskService.update(params.id, updateTaskDto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param() params): Promise<DeleteResult> {
    return this.taskService.delete(params.id);
  }
}
