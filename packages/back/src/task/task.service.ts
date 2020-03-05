import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, getConnection } from 'typeorm';
import { CreateTaskBodyDto, CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { Project } from '../project/project.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(taskBodyDto: CreateTaskBodyDto): Promise<Task> {
    const { projectId, title } = taskBodyDto;
    const project = await this.projectRepository.findOne(projectId);
    const task = new Task();
    task.title = title;
    task.project = project;
    return this.taskRepository.save(task);
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