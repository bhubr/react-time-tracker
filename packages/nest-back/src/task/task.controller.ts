import { Controller, Get, Post, Put, Req, Body, Param, Logger } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('api/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() createCatDto: CreateTaskDto) {
    return this.taskService.create(createCatDto);
  }

  @Put(':id')
  async update(@Param() params, @Body() updateCatDto: CreateTaskDto) {
    return this.taskService.update(params.id, updateCatDto);
  }

  @Get()
  findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }
}
