import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  create(taskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.save(taskDto)
  }

  async update(taskId, taskDto: CreateTaskDto): Promise<Task> {
    await this.taskRepository.update(taskId, taskDto);
    return this.taskRepository.findOne(taskId);
  }

  findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }
}