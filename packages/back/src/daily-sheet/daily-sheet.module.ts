import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailySheetService } from './daily-sheet.service';
import { DailySheetController } from './daily-sheet.controller';
import { DailySheet } from './daily-sheet.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DailySheet]),
  ],
  providers: [DailySheetService],
  controllers: [DailySheetController]
})
export class DailySheetModule {}
