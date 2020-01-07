import { Controller, Get, Post, Put, Delete, Res, Body, Param, HttpCode, HttpException, HttpStatus } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { TimeboxService } from './timebox.service';
import { Timebox } from './timebox.entity';
import { CreateTimeboxDto, TimeboxDto } from './dto/create-timebox.dto';

@Controller('api/timeboxes')
export class TimeboxController {
  constructor(private readonly timeboxService: TimeboxService) {}

  @Post()
  async create(@Body() createTimeboxDto: CreateTimeboxDto) {
    // TODO: Do it the Nest way!!
    if (!createTimeboxDto.taskId) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    return this.timeboxService.create(createTimeboxDto);
  }

  @Get()
  findAll(): Promise<Timebox[]> {
    return this.timeboxService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params): Promise<Timebox> {
    const timebox = await this.timeboxService.findOne(params.id);
    if (!timebox) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return timebox;
  }

  @Put(':id')
  update(@Param() params, @Body() updateTimeboxDto: TimeboxDto) {
    return this.timeboxService.update(params.id, updateTimeboxDto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param() params): Promise<DeleteResult> {
    return this.timeboxService.delete(params.id);
  }
}
