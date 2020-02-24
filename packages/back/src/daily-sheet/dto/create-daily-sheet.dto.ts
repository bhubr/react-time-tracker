import { IsString, IsInt, IsArray } from "class-validator";
import { User } from '../../user/user.entity';

export class CreateDailySheetDto {
  readonly user: User;

  @IsString()
  readonly today: string;
}

export class CreateDailySheetBodyDto {
  @IsArray()
  taskIds: Array<number>;
}