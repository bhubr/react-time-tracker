import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
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

  findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  findOne(taskId): Promise<Task> {
    return this.taskRepository.findOne(taskId);
  }

  async update(taskId, taskDto: CreateTaskDto): Promise<Task> {
    await this.taskRepository.update(taskId, taskDto);
    return this.taskRepository.findOne(taskId);
  }

  delete(taskId): Promise<DeleteResult> {
    return this.taskRepository.delete(taskId);
  }
}