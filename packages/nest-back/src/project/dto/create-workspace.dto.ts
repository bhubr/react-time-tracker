import { IsString } from "class-validator";
import { User } from '../../user/user.entity';

export class CreateWorkspaceDto {
  readonly user: User;

  @IsString()
  readonly title: string;
}

export class CreateWorkspaceBodyDto {
  @IsString()
  readonly title: string;
}