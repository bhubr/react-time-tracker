import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeboxService } from './timebox.service';
import { TimeboxController } from './timebox.controller';
import { Timebox } from './timebox.entity';
import { Task } from '../task/task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Timebox]),
    TypeOrmModule.forFeature([Task], 'tasksConnection')
  ],
  providers: [TimeboxService],
  controllers: [TimeboxController],
})
export class TimeboxModule {}