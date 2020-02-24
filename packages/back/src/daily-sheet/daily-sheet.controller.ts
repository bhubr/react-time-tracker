import { Controller, UseGuards, Post, Request, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DailySheetService } from './daily-sheet.service';
import { CreateDailySheetDto, CreateDailySheetBodyDto } from './dto/create-daily-sheet.dto';

@Controller('api/daily-sheets')
export class DailySheetController {
  constructor(private readonly dailySheetService: DailySheetService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Request() req, @Body() dailySheetBodyDto: CreateDailySheetBodyDto) {
    const taskIds:Array<number> = dailySheetBodyDto.taskIds;
    const dailySheetDto: CreateDailySheetDto = {
      user: req.user, today: new Date().toISOString().substr(0, 10)
    }
    return this.dailySheetService.create(dailySheetDto, taskIds);
  }
}
