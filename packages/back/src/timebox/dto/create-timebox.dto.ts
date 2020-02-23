import { IsInt, IsString } from 'class-validator';
import { TimeboxType } from '../timebox.entity';

export class CreateTimeboxDto {
  @IsInt()
  readonly taskId: number;

  @IsString()
  readonly start: string;

  @IsString()
  readonly comment: string;

  @IsString()
  readonly type: TimeboxType;
}

export class TimeboxDto {
  @IsInt()
  readonly id: number;

  @IsInt()
  readonly taskId: number;

  @IsString()
  readonly start: string;

  @IsString()
  readonly end: string;

  @IsString()
  readonly comment: string;

  @IsString()
  readonly type: TimeboxType;
}