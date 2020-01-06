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
    // const task = new Task();
    // task
    return this.taskRepository.save(taskDto)
      // .then(post => console.log("Post has been saved: ", post))
      // .catch(error => console.log("Cannot save. Error: ", error));
  }

  findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }
}