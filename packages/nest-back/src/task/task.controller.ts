import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { TaskService } from './task.service';
import { Task } from './task.entity';

@Controller('api/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  findAll(): Promise<Task[]> {
    // return [
    //   { id: 1, title: 'Test' },
    // ];
    return this.taskService.findAll();
  }
}
