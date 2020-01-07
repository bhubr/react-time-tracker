import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { Repository, DeleteResult, EntityManager } from 'typeorm';
import { CreateTimeboxDto } from './dto/create-timebox.dto';
import { Timebox } from './timebox.entity';
import { Task } from '../task/task.entity';

@Injectable()
export class TimeboxService {
  constructor(
    @InjectRepository(Timebox)
    private readonly timeboxRepository: Repository<Timebox>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager
  ) {}

  async create(timeboxDto: CreateTimeboxDto): Promise<Timebox> {
    const task = await this.taskRepository.findOne(timeboxDto.taskId);
    const timebox = new Timebox();
    timebox.comment = timeboxDto.comment;
    timebox.start = timeboxDto.start;
    timebox.type = timeboxDto.type;
    timebox.task = task;
    return this.entityManager.save(timebox);
  }

  findAll(): Promise<Timebox[]> {
    return this.timeboxRepository.find();
  }

  findOne(timeboxId): Promise<Timebox> {
    return this.timeboxRepository.findOne(timeboxId);
  }

  async update(timeboxId, timeboxDto: CreateTimeboxDto): Promise<Timebox> {
    await this.timeboxRepository.update(timeboxId, timeboxDto);
    return this.timeboxRepository.findOne(timeboxId);
  }

  delete(timeboxId): Promise<DeleteResult> {
    return this.timeboxRepository.delete(timeboxId);
  }
}