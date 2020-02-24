import { Controller, UseGuards, Post, Request, Body, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DailySheetService } from './daily-sheet.service';
import { CreateDailySheetDto, CreateDailySheetBodyDto } from './dto/create-daily-sheet.dto';
import { getToday } from './helpers/get-today';

@Controller('api/daily-sheets')
export class DailySheetController {
  constructor(private readonly dailySheetService: DailySheetService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Request() req, @Body() dailySheetBodyDto: CreateDailySheetBodyDto) {
    const taskIds:Array<number> = dailySheetBodyDto.taskIds;
    const dailySheetDto: CreateDailySheetDto = {
      user: req.user, today: getToday(),
    };
    return this.dailySheetService.create(dailySheetDto, taskIds);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getToday(@Request() req) {
    return this.dailySheetService.getTodaysTasks(req.user);
  }
}
