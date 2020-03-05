import { IsInt, IsString } from 'class-validator';

export class CreateTaskBodyDto {
  @IsInt()
  readonly projectId: number;

  @IsString()
  readonly title: string;
}

export class CreateTaskDto {
  @IsString()
  readonly title: string;
}