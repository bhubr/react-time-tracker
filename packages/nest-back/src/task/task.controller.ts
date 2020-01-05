import { Controller, Get, Post, Req, Body } from '@nestjs/common';
import { Request } from 'express';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('api/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() createCatDto: CreateTaskDto) {
    this.taskService.create(createCatDto);
  }

  @Get()
  findAll(): Promise<Task[]> {
    // return [
    //   { id: 1, title: 'Test' },
    // ];
    return this.taskService.findAll();
  }
}
