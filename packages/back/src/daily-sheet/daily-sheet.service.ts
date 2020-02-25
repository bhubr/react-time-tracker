import { Injectable } from '@nestjs/common';
import { Repository, In, getConnection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDailySheetDto, CreateDailySheetBodyDto } from './dto/create-daily-sheet.dto';
import { DailySheet } from './daily-sheet.entity';
import { Task } from '../task/task.entity';
import { Timebox } from '../timebox/timebox.entity';
import { User } from '../user/user.entity';
import { getToday } from './helpers/get-today';
import { map } from 'bluebird';

@Injectable()
export class DailySheetService {
  constructor(
    @InjectRepository(DailySheet)
    private readonly dailySheetRepository: Repository<DailySheet>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Timebox)
    private readonly timeboxRepository: Repository<Timebox>,
  ) {}

  async create(
    // createDailySheetDto: CreateDailySheetDto,
    // taskIds: number[],
    dailySheetBodyDto: CreateDailySheetBodyDto,
    user: User
  ): Promise<DailySheet> {
    const taskIds:Array<number> = dailySheetBodyDto.taskIds;
    const createDailySheetDto: CreateDailySheetDto = {
      user, today: getToday(),
    };
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

  async getTodaysTasks(user: User) {
    const criteria = {
      user: user,
      today: getToday()
    };
    let dailySheet = await this.dailySheetRepository.findOne(criteria);
    if (!dailySheet) {
      await this.dailySheetRepository.save(criteria);
      dailySheet = await this.dailySheetRepository.findOne(criteria);
    }
    // const taskIds = dailySheet.tasks.map(({ id }) => id);
    // const timeboxes = await this.timeboxRepository
    //   .createQueryBuilder('timebox')
    //   .where('timebox.taskId IN(:ids)', { ids: taskIds })
    //   .getMany();
      
    // // .find({
    // //   id: In(taskIds)
    // // });
    // console.log(timeboxes);
    await map(dailySheet.tasks, async(task) => {
      console.log(task);
      const timeboxes = await task.timeboxes;
      console.log(timeboxes); 
    });
    return dailySheet;
  }
}
