import { Controller, UseGuards, Post, Request, Body, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DailySheetService } from './daily-sheet.service';
import { CreateDailySheetBodyDto } from './dto/create-daily-sheet.dto';

@Controller('api/daily-sheets')
export class DailySheetController {
  constructor(private readonly dailySheetService: DailySheetService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Request() req, @Body() dailySheetBodyDto: CreateDailySheetBodyDto) {
    return this.dailySheetService.create(dailySheetBodyDto, req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getToday(@Request() req) {
    return this.dailySheetService.getTodaysTasks(req.user);
  }
}
