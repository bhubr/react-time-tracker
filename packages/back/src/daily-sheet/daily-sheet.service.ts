import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDailySheetDto, CreateDailySheetBodyDto } from './dto/create-daily-sheet.dto';
import { DailySheet } from './daily-sheet.entity';

@Injectable()
export class DailySheetService {
  constructor(
    @InjectRepository(DailySheet)
    private readonly dailySheetRepository: Repository<DailySheet>,
  ) {}

  async create(createDailySheetDto: CreateDailySheetDto): Promise<DailySheet> {
    // const { workspaceId, ...projectIntrinsicFields } = createDailySheetDto;
    // const workspace = await this.workspaceRepository.findOne(workspaceId);
    // const projectDto = { ...projectIntrinsicFields, workspaces: [workspace] };
    return this.dailySheetRepository.save(createDailySheetDto)
  }
}
