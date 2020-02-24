import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailySheetService } from './daily-sheet.service';
import { DailySheetController } from './daily-sheet.controller';
import { DailySheet } from './daily-sheet.entity';
import { Task } from '../task/task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DailySheet, Task]),
  ],
  providers: [DailySheetService],
  controllers: [DailySheetController]
})
export class DailySheetModule {}
