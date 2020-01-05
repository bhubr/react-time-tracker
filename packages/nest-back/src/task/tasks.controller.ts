import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('api/tasks')
export class TasksController {
  @Get()
  findAll(@Req() request: Request): any {
    return [
      { id: 1, title: 'Test' }
    ];
  }
}