import { Injectable } from '@nestjs/common';
import { Repository, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDailySheetDto, CreateDailySheetBodyDto } from './dto/create-daily-sheet.dto';
import { DailySheet } from './daily-sheet.entity';
import { Task } from '../task/task.entity';

@Injectable()
export class DailySheetService {
  constructor(
    @InjectRepository(DailySheet)
    private readonly dailySheetRepository: Repository<DailySheet>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(
    createDailySheetDto: CreateDailySheetDto,
    taskIds: number[],
  ): Promise<DailySheet> {
    // const { workspaceId, ...projectIntrinsicFields } = createDailySheetDto;
    // const workspace = await this.workspaceRepository.findOne(workspaceId);
    // const projectDto = { ...projectIntrinsicFields, workspaces: [workspace] };
    const dailySheet = await this.dailySheetRepository.save(createDailySheetDto);
    if (taskIds.length) {
      // const task = await this.taskRepository.findOne(taskIds[0]);
      const tasks = await this.taskRepository.find({
        id: In(taskIds)
      });
      dailySheet.tasks = tasks;
      await this.dailySheetRepository.save(dailySheet);
    }
    return dailySheet;
  }
}
