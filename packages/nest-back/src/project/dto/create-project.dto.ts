import { IsNumber, IsString } from "class-validator";

export class CreateProjectDto {
  @IsNumber()
  readonly workspaceId: string;

  @IsString()
  readonly title: string;
}