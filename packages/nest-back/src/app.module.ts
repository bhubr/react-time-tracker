import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import './env';
import { AppController } from './app.controller';
import { TasksController } from './task/tasks.controller';
import { AppService } from './app.service';
import settings from './settings';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...settings.database,
      entities: [],
      synchronize: true,
    }),
  ],
  controllers: [AppController, TasksController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
