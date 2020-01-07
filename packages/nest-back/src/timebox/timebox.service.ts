import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { Repository, DeleteResult, EntityManager } from 'typeorm';
import { CreateTimeboxDto, TimeboxDto } from './dto/create-timebox.dto';
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

  async create(createTimeboxDto: CreateTimeboxDto): Promise<TimeboxDto> {
    const parentTask = await this.taskRepository.findOne(createTimeboxDto.taskId);
    const timebox = new Timebox();
    timebox.comment = createTimeboxDto.comment;
    timebox.start = createTimeboxDto.start;
    timebox.type = createTimeboxDto.type;
    timebox.task = parentTask;
    const createdTimebox:Timebox = await this.entityManager.save(timebox);
    const { task, ...rest } = createdTimebox;
    const timeboxDto: TimeboxDto = { ...rest, taskId: task.id };
    return timeboxDto;
  }

  findAll(): Promise<Timebox[]> {
    return this.timeboxRepository.find();
  }

  findOne(timeboxId): Promise<Timebox> {
    return this.timeboxRepository.findOne(timeboxId);
  }

  async update(timeboxId, timeboxDto: TimeboxDto): Promise<TimeboxDto> {
    const { taskId, ...ownFields } = timeboxDto;
    await this.timeboxRepository.update(timeboxId, ownFields);
    const timebox = await this.timeboxRepository.findOne(timeboxId);
    return { ...timebox, taskId };
  }

  delete(timeboxId): Promise<DeleteResult> {
    return this.timeboxRepository.delete(timeboxId);
  }
}