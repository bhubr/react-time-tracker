import { IsString } from "class-validator";

export class CreateProjectDto {
  @IsString()
  readonly title: string;
}