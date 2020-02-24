import { IsString, IsInt } from "class-validator";
import { User } from '../../user/user.entity';

export class CreateDailySheetDto {
  readonly user: User;

  @IsString()
  readonly today: string;

  taskIds: number[];
}

export class CreateDailySheetBodyDto {
  taskIds: number[];
}