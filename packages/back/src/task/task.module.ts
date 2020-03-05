import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Task } from './task.entity';
import { Project } from '../project/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Project])],
  providers: [TaskService],
  controllers: [TaskController],
  exports: [TypeOrmModule]
})
export class TaskModule {}